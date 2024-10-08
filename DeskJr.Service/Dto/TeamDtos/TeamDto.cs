﻿using DeskJr.Entity.Models;
using System;
namespace DeskJr.Service.Dto
{
    public class TeamDto
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
        public Guid? ManagerId { get; set; }
        public ManagerDto? Manager { get; set; }
        public Guid? UpTeamId { get; set; }
    }
}

