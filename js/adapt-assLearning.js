define([
	"core/js/adapt",
	"components/adapt-contrib-assessmentResults/js/adapt-contrib-assessmentResults"
], function(Adapt, AssessmentResults) {

	function overrideAssessmentResults() {
		var setFeedbackText = AssessmentResults.model.prototype.setFeedbackText;

		AssessmentResults.model.prototype.setFeedbackText = function() {
			var state = this.get("_state");
			var ids = [];
			var data = [];

			state.questionModels.each(function(question) {
				if (question.get("_isCorrect")) return;

				var assIds = question.get("_assLearning");

				if (!assIds) return;

				for (var i = 0, j = assIds.length; i < j; i++) {
					var assId = assIds[i];

					if (!_.contains(ids, assId)) ids.push(assId);
				}
			});

			for (var i = 0, j = ids.length; i < j; i++) {
				var model = Adapt.findById(ids[i]);

				if (model) data.push(model.toJSON());
			}

			state.assLearning = Handlebars.templates.assLearning(data);

			setFeedbackText.call(this);
		};
	}

	Adapt.once("app:dataReady", overrideAssessmentResults);

});
