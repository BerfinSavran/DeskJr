﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeskJr.Entity.Models
{
    public class Team
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
        public Guid? ManagerId { get; set; }

        public Team()
        {
            ID = Guid.NewGuid();
        }
    }
    
}