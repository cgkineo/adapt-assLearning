define([
	"core/js/adapt",
	"components/adapt-contrib-assessmentResults/js/adapt-contrib-assessmentResults"
], function(Adapt, AssessmentResults) {

	function overrideAssessmentResults() {
		var setFeedback = AssessmentResults.prototype.setFeedback;

		AssessmentResults.prototype.setFeedback = function(feedbackBand) {
			var state = this.model.get("_state");
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

				if (model) data.push(model.attributes);
			}

			state.assLearning = Handlebars.templates.assLearning(data);

			setFeedback.call(this, feedbackBand);
		};
	}

	Adapt.once("app:dataReady", overrideAssessmentResults);

});
