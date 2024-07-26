﻿using AutoMapper;
using DeskJr.Service.Abstract;
using DeskJr.Service.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DeskJr.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly JwtSettings _jwtSettings;
        private readonly IEmployeeService _employeeService;
        private readonly IMapper _mapper;

        public LoginController(IOptions<JwtSettings> jwtSettings, IEmployeeService employeeService, IMapper mapper)
        {
            _jwtSettings = jwtSettings.Value;
            _employeeService = employeeService;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO loginRequest)
        {
            var employee = await AuthenticationControlAsync(loginRequest);
            if (employee == null) return Unauthorized();

            var token = CreateToken(employee);

            var response = new LoginResponseDTO
            {
                Token = token,
                Employee = employee
            };

            return Ok(response);
        }

        private string CreateToken(EmployeeDto employee)
        {
            if (_jwtSettings.Key == null) throw new Exception("JWT key is NULL");

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, employee.Name),
                new Claim(ClaimTypes.Email, employee.Email),
                new Claim(ClaimTypes.Role, employee.EmployeeRole.ToString())
            };

            var token = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: claims,
                expires: DateTime.Now.AddDays(7),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private async Task<EmployeeDto?> AuthenticationControlAsync(LoginRequestDTO loginRequest)
        {
            var employee = await _employeeService.GetEmployeeByEmailAsync(loginRequest.Email);

            if (employee != null && employee.Password == loginRequest.Password)
            {
                return employee;
            }

            return null;
        }
    }
}