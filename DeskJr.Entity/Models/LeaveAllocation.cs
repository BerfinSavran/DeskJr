﻿using System;
using System.ComponentModel.DataAnnotations;

namespace DeskJr.Entity.Models
{
    public class LeaveAllocation: BaseEntity
    {
       
        public int NumberOfDays { get; set; }
        public DateTime DateCreated { get; set; }

        // Navigation properties
        public string EmployeeId { get; set; }
        public Employee Employee { get; set; }

        public int LeaveTypeId { get; set; }
        public LeaveType LeaveType { get; set; }

        public int Period { get; set; }
       
    }
}