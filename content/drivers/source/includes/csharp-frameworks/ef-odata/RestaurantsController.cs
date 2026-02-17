using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.AspNetCore.OData.Routing.Attributes;
using RestaurantODataApi.Models;

namespace RestaurantODataApi.Controllers
{
    public class RestaurantsController : ODataController
    {
        private readonly RestaurantDbContext _context;

        public RestaurantsController(RestaurantDbContext context)
        {
            _context = context;
        }

        [EnableQuery(PageSize = 50, AllowedQueryOptions = AllowedQueryOptions.All)]
        public IQueryable<Restaurant> Get()
        {
            return _context.Restaurants;
        }

        [HttpGet("odata/GetRestaurantsByBorough(borough={borough})")]
        [EnableQuery(PageSize = 20)]
        public IQueryable<Restaurant> GetRestaurantsByBorough(string borough)
        {
            return _context.Restaurants.Where(r => r.Borough == borough);
        }

        [HttpGet("odata/GetRestaurantsByCuisine(cuisine={cuisine})")]
        [EnableQuery(PageSize = 20)]
        public IQueryable<Restaurant> GetRestaurantsByCuisine(string cuisine)
        {
            return _context.Restaurants.Where(r => r.Cuisine == cuisine);
        }
    }
}