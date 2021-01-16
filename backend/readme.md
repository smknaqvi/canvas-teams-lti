### Environment Variables

Sample .env below

```

PORT=3000
HOST_ADDRESS=http://127.0.0.1
CANVAS_ADDRESS=https://canvas.docker
DEV_CLIENT_ID=10000000000001
DEV_LTI_KEY=QccM4j9rqwEmEH8xbpDzjb2tULNEfz1WQySbIEiO5LtNwDmpr7S1gSpTn0FIvUAy
DB_TABLE=lti
DB_USER=ltitest
DB_PASS='123456789'
```

### JSON Configuration

Key pair is located in constants.ts

```
{
    "title": "Cool App",
    "scopes": [
        "https://canvas.instructure.com/lti/feature_flags/scope/show",
        "https://canvas.instructure.com/lti/data_services/scope/list_event_types",
        "https://canvas.instructure.com/lti/data_services/scope/destroy",
        "https://canvas.instructure.com/lti/data_services/scope/list",
        "https://canvas.instructure.com/lti/data_services/scope/update",
        "https://canvas.instructure.com/lti/data_services/scope/show",
        "https://canvas.instructure.com/lti/data_services/scope/create",
        "https://canvas.instructure.com/lti/account_lookup/scope/show",
        "https://canvas.instructure.com/lti/public_jwk/scope/update",
        "https://purl.imsglobal.org/spec/lti-nrps/scope/contextmembership.readonly",
        "https://purl.imsglobal.org/spec/lti-ags/scope/score",
        "https://purl.imsglobal.org/spec/lti-ags/scope/result.readonly",
        "https://purl.imsglobal.org/spec/lti-ags/scope/lineitem.readonly",
        "https://purl.imsglobal.org/spec/lti-ags/scope/lineitem"
    ],
    "extensions": [
        {
            "platform": "canvas.instructure.com",
            "settings": {
                "platform": "canvas.instructure.com",
                "placements": [
                    {
                        "enabled": true,
                        "placement": "account_navigation",
                        "message_type": "LtiResourceLinkRequest",
                        "windowTarget": "_blank",
                        "target_link_uri": "http://127.0.0.1:3000/"
                    },
                    {
                        "enabled": true,
                        "placement": "link_selection",
                        "message_type": "LtiResourceLinkRequest",
                        "windowTarget": "_blank",
                        "target_link_uri": "http://127.0.0.1:3000/auth/redirect"
                    },
                    {
                        "enabled": true,
                        "placement": "course_navigation",
                        "message_type": "LtiResourceLinkRequest",
                        "windowTarget": "_blank",
                        "target_link_uri": "http://127.0.0.1:3000/auth/redirect"
                    }
                ]
            },
            "privacy_level": "public"
        }
    ],
    "public_jwk": {
        "e": "AQAB",
        "n": "llTFHRK__L-Wt73x3FwVKJH1OvQyQv5_8mzBuCMN7cvYJff1fek65WSsshyxFwcgDbbFC9DNVk5RIJFGCa-jjg84wGQUb4cygBvZ2-f7d1AHD9yX0XYLk5CFE5MkAOniugZKssL7wYtRFc63r14lRu0oqZChXU5MSsRKutswrBSGk-SlKrb6si5ZUdPu5C8ygBrpd41CSPoM8eXyQDduH0KZHgpUu3Ah8mpY7_7uH35ZvMJhq1HstX-4KQrcGEhigAKntTTIKW0RLn0hKN0IijWH6xhvMD2e_NpruSbfkiQJ9u3qwvPu86BXVQ1s6_A3Sf0g7VplcNF2AM69f4LG6Pw",
        "alg": "RS256",
        "kid": "test",
        "kty": "RSA",
        "use": "sig"
    },
    "description": "cool app",
    "custom_fields": {
        "username": "$Person.name.display",
        "course_id": "$Canvas.course.id",
        "course_name": "$Canvas.course.name",
        "canvas_domain": "$Canvas.api.domain"
    },
    "target_link_uri": "http://127.0.0.1:3000/",
    "oidc_initiation_url": "http://127.0.0.1:3000/login"
}
```
