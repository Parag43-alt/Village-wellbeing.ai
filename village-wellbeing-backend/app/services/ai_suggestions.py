from typing import List, Dict, Any

# Mock AI suggestions - replace with actual AI model integration later
MOCK_SUGGESTIONS = {
    "health": [
        {"id": 1, "suggestion": "Ensure access to clean drinking water. Test water sources regularly.", "priority": "High"},
        {"id": 2, "suggestion": "Promote handwashing with soap at critical times.", "priority": "High"},
        {"id": 3, "suggestion": "Organize vaccination camps for children and adults.", "priority": "Medium"},
        {"id": 4, "suggestion": "Conduct awareness programs on sanitation and hygiene.", "priority": "Medium"},
    ],
    "water_quality": [
        {"id": 1, "suggestion": "Protect water sources from contamination (e.g., fence wells, prevent runoff).", "priority": "High"},
        {"id": 2, "suggestion": "Implement household water treatment methods like boiling or filters.", "priority": "High"},
        {"id": 3, "suggestion": "Regularly clean and disinfect community water storage tanks.", "priority": "Medium"},
        {"id": 4, "suggestion": "Test water for common contaminants (bacteria, arsenic, fluoride) and take action.", "priority": "High"},
    ],
    "agriculture": [
        {"id": 1, "suggestion": "Promote crop diversification to improve soil health and income stability.", "priority": "Medium"},
        {"id": 2, "suggestion": "Introduce water-efficient irrigation techniques.", "priority": "High"},
    ],
    "education": [
        {"id": 1, "suggestion": "Ensure all children are enrolled in school and attend regularly.", "priority": "High"},
        {"id": 2, "suggestion": "Provide adult literacy programs.", "priority": "Medium"},
    ]
}

def get_ai_suggestions(category: str, village_id: int = None) -> List[Dict[str, Any]]:
    """
    Fetches AI-based suggestions.
    In a real system, this would interact with an AI model, possibly considering village_id.
    """
    # Simple mock: return suggestions based on category. village_id is ignored for now.
    return MOCK_SUGGESTIONS.get(category.lower(), [])