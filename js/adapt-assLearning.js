define([
  'core/js/adapt',
  'components/adapt-contrib-assessmentResults/js/adapt-contrib-assessmentResults'
], function(Adapt, AssessmentResults) {

  function overrideAssessmentResults() {
    const setFeedbackText = AssessmentResults.model.prototype.setFeedbackText;

    AssessmentResults.model.prototype.setFeedbackText = function() {
      const state = this._state;
      const ids = [];
      const data = [];

      state.questionModels.each(function(question) {
        if (question.get('_isCorrect')) return;

        const assIds = question.get('_assLearning');

        if (!assIds) return;

        for (let i = 0, j = assIds.length; i < j; i++) {
          const assId = assIds[i];

          if (!_.contains(ids, assId)) ids.push(assId);
        }
      });

      for (let i = 0, j = ids.length; i < j; i++) {
        const model = Adapt.findById(ids[i]);

        if (model) data.push(model.toJSON());
      }

      state.assLearning = Handlebars.templates.assLearning(data);

      setFeedbackText.call(this);
    };
  }

  Adapt.once('app:dataReady', overrideAssessmentResults);

});
