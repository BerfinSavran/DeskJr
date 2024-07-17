﻿
using DeskJr.Entity.Models;
using DeskJr.Repository.Abstract;
using Microsoft.EntityFrameworkCore;

namespace CoordinateApp.Repositories.Concrete;

public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
{
    private readonly DbContext _context;
    private readonly DbSet<T> _dbSet;
    public GenericRepository(DbContext context)
    {
        _context = context;
        _dbSet = _context.Set<T>();
    }

    public async Task<bool> AddAsync(T entity)
    {
        await _dbSet.AddAsync(entity);
        var affectedRowCount = await _context.SaveChangesAsync();
        return affectedRowCount > 0;
    }

    public async Task<bool> UpdateAsync(T entity)
    {
        var affectedRowCount = 0;
        var dbTeam = await _dbSet.FindAsync(entity.ID);
        if (dbTeam != null)
        {
            _context.Entry(dbTeam).CurrentValues.SetValues(entity);

            affectedRowCount = await _context.SaveChangesAsync();
        }
        return affectedRowCount > 0;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var dbTeam = await _dbSet.FirstOrDefaultAsync(e => e.ID == id);
        if (dbTeam != null)
        {
            _dbSet.Remove(dbTeam);
            await _context.SaveChangesAsync();
            return true;
        }
        return false;
    }

    public async Task<List<T>> GetAllAsync()
    {
        var dbTeams = await _dbSet.ToListAsync();
        return dbTeams;
    }

    public async Task<T?> GetByIdAsync(Guid id)
    {
        var dbTeam = await _dbSet.FirstOrDefaultAsync(e => e.ID == id);
        return dbTeam;
    }
}