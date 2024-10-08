﻿using DeskJr.Data;
using DeskJr.Entity.Models;
using DeskJr.Repositories.Concrete;
using DeskJr.Repository.Abstract;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeskJr.Repository.Concrete
{
    public class SettingRepository : GenericRepository<Setting>, ISettingRepository
    {
        private readonly AppDbContext _context;

        public SettingRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Setting> GetAccuredDay()
        {
            return await _context.Settings.FirstOrDefaultAsync(x => x.Key == "Accrued Day");
        }
    }
}
