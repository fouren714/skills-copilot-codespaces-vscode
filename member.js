function skillsMember() {
  // Path: member.js
  function addSkill(skill) {
    // Path: member.js
    function getSkill() {
      return skill;
    }
    return { getSkill };
  }
  return { addSkill };
}