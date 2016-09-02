# Ass Learning

An extension to add a list of associated learning to Assessment Results.

## Installation

* For questions with associated learning, list their linked IDs:
```json
"_assLearning": [
	"c-05"
]
```
* Add the reference `{{{assLearning}}}` to the text in the Assessment Results component. 
* Copy the extension folder into the src > extensions directory and run an appropriate Grunt task.

## Usage

* Associated learning is listed for incorrectly answered questions with linked IDs.
* Override [assLearning.hbs](templates/assLearning.hbs) to display different attributes for the associated learning.

## Attributes

Attribute | Type | Description | Default
--------- | ---- | ----------- | -------
`_assLearning` | Array | The IDs associated with the question | `[]`