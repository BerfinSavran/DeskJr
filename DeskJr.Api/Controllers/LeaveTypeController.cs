﻿using DeskJr.Service.Abstract;
using Microsoft.AspNetCore.Mvc;
using DeskJr.Service.Dto;

namespace DeskJr.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveTypeController : ControllerBase
    {
        private readonly ILeaveTypeService _leaveTypeservice;

        public LeaveTypeController(ILeaveTypeService leaveTypeervice)
        {
            _leaveTypeservice = leaveTypeervice;
        }

        [HttpPost]
        public async Task<ActionResult> CreateLeaveType(LeaveTypeCreateDTO leaveTypeDto)
        {
            var result = await _leaveTypeservice.AddLeaveTypeAsync(leaveTypeDto);
            if (result)
            {
                return Ok();
            }
            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteLeaveType(Guid id)
        {
            var result = await _leaveTypeservice.DeleteLeaveTypeAsync(id);
            if (result)
            {
                return Ok();
            }
            return NotFound();
        }

        [HttpGet]
        public async Task<ActionResult> GetAllLeaveTypes()
        {
            var leaveTypes = await _leaveTypeservice.GetAllLeaveTypesAsync();
            return Ok(leaveTypes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetLeaveTypeById(Guid id)
        {
            var leaveType = await _leaveTypeservice.GetLeaveTypeByIdAsync(id);
            return Ok(leaveType);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateLeaveType(LeaveTypeUpdateDTO LeaveTypeDto)
        {
            var result = await _leaveTypeservice.UpdateLeaveTypeAsync(LeaveTypeDto);
            if (result)
            {
                return Ok();
            }
            return BadRequest();
        }
    }
}