export class ConditionalLogic {
  static evaluateCondition(
    rule,
    responses
  ) {
    const fieldValue = responses[rule.sourceSectionId]?.[rule.fieldId];

    if (fieldValue === undefined || fieldValue === null) {
      return false;
    }
    switch (rule.operator) {
      case 'equals':
        return fieldValue === rule.value;

      case 'not_equals':
        return fieldValue !== rule.value;

      case 'contains':
        if (Array.isArray(fieldValue)) {
          return fieldValue.includes(rule.value);
        }
        return String(fieldValue).toLowerCase().includes(String(rule.value).toLowerCase());

      case 'greater_than':
        return Number(fieldValue) > Number(rule.value);

      case 'less_than':
        return Number(fieldValue) < Number(rule.value);

      default:
        return false;
    }
  }
  static getNextSectionId(
    currentSectionId,
    responses,
    rules,
    defaultNextSection
  ) {
    // Find rules that apply to the current section
    const applicableRules = rules.filter(rule => rule.sourceSectionId === currentSectionId);

    for (const rule of applicableRules) {
      if (this.evaluateCondition(rule, responses)) {
        return rule.targetSectionId;
      } else if (rule.elseSectionId) {
        return rule.elseSectionId;
      }
    }

    return defaultNextSection || null;
  }
  static canNavigateToSection(
    targetSectionId,
    currentSectionId,
    responses,
    rules
  ) {
    // Allow navigation to previous sections
    if (responses[targetSectionId]) {
      return true;
    }

    // Check if target section can be reached from current section
    const nextSectionId = this.getNextSectionId(currentSectionId, responses, rules);
    return nextSectionId === targetSectionId;
  }
}