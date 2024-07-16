﻿using System;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DeskJr.Entity.Models
{
    public class LeaveRequest
    {
        [Key]
        public Guid Id { get; set; }

        public string RequestingEmployeeId { get; set; }
        public Employee RequestingEmployee { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public int LeaveTypeId { get; set; }
        public LeaveType LeaveType { get; set; }

        public DateTime DateRequested { get; set; }
        public string RequestComments { get; set; }
        public DateTime DateActioned { get; set; }
        public bool? Approved { get; set; }
        public bool Cancelled { get; set; }

        public string ApprovedById { get; set; }
        public Employee ApprovedBy { get; set; }

        public LeaveRequest()
        {
            Id = Guid.NewGuid();
        }

    }
}