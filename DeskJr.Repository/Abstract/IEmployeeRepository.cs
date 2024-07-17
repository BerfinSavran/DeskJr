﻿using DeskJr.Entity.Models;

namespace DeskJr.Repository.Abstract;

public interface IEmployeeRepository: IGenericRepository<Employee>
{
    
    public Task<IEnumerable<Employee?>> GetEmployeesByTeamIdAsync(Guid teamId);

}
