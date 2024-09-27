namespace API.Helpers
{
    public class LikesParms : PaginationParams
    {
        public int UserId { get; set; }
        public required string Predicate { get; set; } = "liked";
    }
}
