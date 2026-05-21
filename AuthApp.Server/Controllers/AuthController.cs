using AuthApp.Server.Data;
using AuthApp.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace AuthApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("signup")]
        public IActionResult SignUp(User user)
        {
            if (string.IsNullOrWhiteSpace(user.Username) ||
                string.IsNullOrWhiteSpace(user.Email) ||
                string.IsNullOrWhiteSpace(user.Password))
            {
                return BadRequest("All fields are required");
            }

            var existingUser = _context.Users
                .FirstOrDefault(x => x.Email == user.Email);

            if (existingUser != null)
            {
                return BadRequest("User already exists");
            }

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok(new
            {
                message = "User registered successfully"
            });
        }

        [HttpPost("signin")]
        public IActionResult SignIn(User login)
        {
            var user = _context.Users.FirstOrDefault(x =>
                (x.Email == login.Email ||
                 x.Username == login.Username)
                && x.Password == login.Password);

            if (user == null)
            {
                return Unauthorized("Invalid credentials");
            }

            return Ok(new
            {
                username = user.Username
            });
        }
    }
}