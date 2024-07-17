﻿using CoordinateApp.Repositories.Concrete;
using DeskJr.Data;
using DeskJr.Entity.Models;
using DeskJr.Repository.Abstract;
using Microsoft.EntityFrameworkCore;

namespace DeskJr.Repository.Concrete
{
    public class EmployeeRepository : GenericRepository<Employee>, IEmployeeRepository
    {
        private readonly AppDbContext _context;

        public EmployeeRepository(AppDbContext context): base(context)
        {
            _context = context;
        }


        public async Task<IEnumerable<Employee?>> GetEmployeesByTeamIdAsync(Guid teamId)
        {
            return await _context.Employees.Where(e => e.TeamId == teamId).ToListAsync();
        }
    }
    
}
