# Form Definition Schema
{
  "id": "form-001",
  "title": "Customer Onboarding",
  "version": "1.0",
  "pages": [
    {
      "id": "page-start",
      "title": "Welcome",
      "fields": [
        {
          "id": "field-name",
          "type": "text",
          "label": "Full Name",
          "required": true,
          "validation": {
            "minLength": 2,
            "maxLength": 50
          }
        }
      ],
      "conditions": [
        {
          "fieldId": "field-type",
          "operator": "equals",
          "value": "Personal",
          "targetPageId": "page-personal"
        }
      ]
    }
  ],
  "actions": [...],
  "settings": {...}
}

# Form Responses Schema
{
  "formId": "form-001",
  "sessionId": "sess-123",
  "responses": {
    "field-name": "John Doe",
    "field-type": "Personal",
    "field-age": 25,
    "field-income": "$60k-$100k"
  },
  "metadata": {
    "startTime": "2025-01-15T10:30:00Z",
    "endTime": "2025-01-15T10:35:00Z",
    "currentPage": "page-summary",
    "completionPercentage": 80,
    "userAgent": "...",
    "ipAddress": "..."
  },
  "validation": {
    "isValid": true,
    "errors": []
  }
}

# 10/09

form have multiple pages, pages ahve multiple sections

{
  pages: [
    {
      sections: [{
        fields: [],
        actions: []
      }],
      actions: []
    }
  ]
}