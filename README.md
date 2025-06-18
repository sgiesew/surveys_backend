The backend provides CRUD endpoints for these database tables:

Task (how a statement has been rated by a respondent in an individual survey, belongs to Survey)
- id (PK)
- surveyId (FK)
- number
- response


Survey (an individual survey assigned to a respondent, belongs to SurveyType)
- id (PK)
- surveyTypeId (FK)
- personId (FK)
- current_task
- num_tasks
- num_completed
- completed


Statement (a statement to be rated, belongs to SurveyType)
- id (PK)
- surveyTypeId (FK)
- number
- text


SurveyType (a survey)
- id (PK)
- personId (FK)
- surveyTypeStatusId (FK)
- name
- num_surveys
- num_completed


SurveyTypeStatus
- id (PK)
- usid


Person (a user)
- id (PK)
- roleId (FK)
- firstName
- lastName
- username
- password


Role:
- id (PK)
- usid

