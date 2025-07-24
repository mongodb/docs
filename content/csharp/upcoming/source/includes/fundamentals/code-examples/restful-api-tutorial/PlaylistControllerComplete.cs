using System;
using Microsoft.AspNetCore.Mvc;
using MongoExample.Services;
using MongoExample.Models;

namespace MongoExample.Controllers; 

[Controller]
[Route("api/[controller]")]
public class PlaylistController: Controller {
    
    private readonly MongoDBService _mongoDBService;

    public PlaylistController(MongoDBService mongoDBService) {
        _mongoDBService = mongoDBService;
    }

    //start-get
    [HttpGet]
    public async Task<List<Playlist>> Get() {
      return await _mongoDBService.GetAsync();
    }
    //end-get

    //start-post
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Playlist playlist) {
      await _mongoDBService.CreateAsync(playlist);
      return CreatedAtAction(nameof(Get), new { id = playlist.Id }, playlist);
    }
    //end-post

    //start-put
    [HttpPut("{id}")]
    public async Task<IActionResult> AddToPlaylist(string id, [FromBody] string movieId) {    
      await _mongoDBService.AddToPlaylistAsync(id, movieId);
      return NoContent();
    }
    //end-put

    //start-delete
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id) {
      await _mongoDBService.DeleteAsync(id);
      return NoContent();
    }
    //end-delete

}