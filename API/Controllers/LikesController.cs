using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class LikesController(ILikesRepossitory likesRepossitory) : BaseApiController
{
    [HttpPost("{targetUserId:int}")]
    public async Task<ActionResult>ToggleLike(int targetUserId)
    {
        var sourceUserId = User.GetUserId();
        if (sourceUserId == targetUserId) return BadRequest("You cannot like yourself");
        var existingLike = await likesRepossitory.GetUserLike(sourceUserId, targetUserId);
        if (existingLike == null)
        {
            var like = new UserLike
            {
                SourceUserId = sourceUserId,
                TargetUserId = targetUserId
            };
            likesRepossitory.AddLike(like);
        }
        else { 
            likesRepossitory.DeleteLike(existingLike);
        }

        if(await likesRepossitory.SaveChanges()) return Ok();

        return BadRequest("Failed to update like");
    }
    [HttpGet("list")]
    public async Task<ActionResult<IEnumerable<int>>> GetCurrentUserLikeIds()
    {
        return Ok(await likesRepossitory.GetCurrentUserLikeIds(User.GetUserId()));
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetUserLikes([FromQuery]LikesParms likesParams)
    {
        likesParams.UserId = User.GetUserId();
        var users = await likesRepossitory.GetUserLikes(likesParams);
        Response.AddPaginationHeader(users);
        return Ok(users);
    }
}
