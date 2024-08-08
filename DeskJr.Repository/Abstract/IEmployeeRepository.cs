﻿using DeskJr.Entity.Models;

namespace DeskJr.Repository.Abstract;

public interface IEmployeeRepository: IGenericRepository<Employee>
{
    
    public Task<IEnumerable<Employee?>> GetEmployeesByTeamIdAsync(Guid teamId);
    public Employee? GetByIdWithInclude(Guid id);
    public Task<Employee?> GetEmployeeByEmailAsync(string email);
    public IEnumerable<Employee> GetListWithIncludeEmployeeAsync();
    Task<IEnumerable<Employee>> GetUpcomingBirthdaysAsync();
}
