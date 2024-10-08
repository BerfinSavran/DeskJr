﻿using DeskJr.Entity.Models;

namespace DeskJr.Repository.Abstract
{
    public interface ISurveyQuestionOptionsRepository : IGenericRepository<SurveyQuestionOptions>
    {
        public Task<List<SurveyQuestionOptions>> GetSurveyQuestionOptionsBySurveyQuestionIdAsync(Guid surveyQuestionsId);
    }
}
