# form fields
"formId": "advanced-multi-section-form",
"title": "Multi-Section Form with Conditional Logic",
"description": "A comprehensive form with pages, sections, and conditional navigation",
"layout_theme": "modern",
"version": "1.0",
"settings": {
    "allowBack": true,
    "showProgress": true,
    "saveProgress": true,
    "submitOnce": false
},
"pages": [],
"submissions": {
    "endpoint": "/api/forms/submit",
    "method": "POST",
    "headers": {
        "Content-Type": "application/json"
    },
    "successMessage": "Thank you! Your application has been submitted successfully.",
    "errorMessage": "There was an error submitting the form. Please try again."
}


## pages
"id": "page-1",
"title": "page-1",
"order": 1,
"sections": [],
"actions": []

### sections
"id": "section-1-1",
"title": "page-1",
"order": 1,
"fields": [],
"actions": []

#### fields
{
    "fieldId": "age",
    "type": "number_input",
    "title": "Age",
    "description": "Your current age",
    "placeholder": "Enter your age",
    "required": true,
    "config": {
        "defaultValue": 25
    },
    "validation": {
        "min": 18,
        "max": 65,
        "errorMessage": "Age must be between 18 and 65"
    }
}

### actions (page action)
{
    "id": 1,
    "type": "navigate" || "submit"
    "conditions": [
        { "field_id": "age_id", "operator": "less_than", "value": 18 },
        { "field_id": "country_id", "operator": "equal", "value": "India" }
    ],
    "target": {
        "type": "page",
        "id": "page-2"
    }
}
{
    "default": true,
    "goTo": "page-3"
}



# Final
{
    "formId": "advanced-multi-section-form",
    "title": "Multi-Section Form with Conditional Logic",
    "description": "A comprehensive form with pages, sections, and conditional navigation",
    "layout_theme": "modern",
    "version": "1.0",
    "settings": {
        "allowBack": true,
        "showProgress": true,
        "saveProgress": true,
        "submitOnce": false
    },
    "pages": [
        {
            "pageId": "page-1",
            "order": 1,
            "sections": [
                {
                    "sectionId": "section-1-1",
                    "order": 1,
                    "fields": [
                        {
                            "fieldId": "age",
                            "type": "number_input",
                            "title": "Age",
                            "description": "Your current age",
                            "placeholder": "Enter your age",
                            "required": true,
                            "config": {
                                "defaultValue": 25
                            },
                            "validation": {
                                "min": 18,
                                "max": 65,
                                "errorMessage": "Age must be between 18 and 65"
                            }
                        }
                    ],
                    "actions": []
                }
            ],
            "actions": [
                {
                    {
                        "conditions": [
                            { "field": "age", "operator": ">", "value": 18 },
                            { "field": "country", "operator": "==", "value": "India" }
                        ],
                        "goTo": "page-2"
                    },
                    {
                        "default": true,
                        "goTo": "page-3"
                    }
                }
            ]
        }
    ],
    "submissions": {
        "endpoint": "/api/forms/submit",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "successMessage": "Thank you! Your application has been submitted successfully.",
        "errorMessage": "There was an error submitting the form. Please try again."
    }
}