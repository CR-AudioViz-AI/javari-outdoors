// lib/tool-data.ts — javari-outdoors
// CR AudioViz AI · May 2026
export function getActions() {
  return [
    { id: 'trail_planner',  label: '🗺️ Trail Planner',    desc: 'Personalized trail recommendations',       buildPrompt: function(v) { return 'Recommend the best hiking trails in ' + (v.location||'the United States') + ' for a ' + (v.fitness||'moderate') + ' fitness level. Trip: ' + (v.days||'1 day') + '. Group: ' + (v.group||'solo') + '. Interests: ' + (v.interests||'scenic views') + '. Include: trail names, difficulty, distance, elevation, best season, parking, highlights.' } },
    { id: 'gear_checklist', label: '🎒 Gear Checklist',    desc: 'Complete packing list for your adventure', buildPrompt: function(v) { return 'Create a comprehensive gear checklist for a ' + (v.activityType||'hiking') + ' trip in ' + (v.location||'the mountains') + ' for ' + (v.days||'3 days') + '. Season: ' + (v.season||'summer') + '. Level: ' + (v.fitness||'intermediate') + '. Group: ' + (v.group||'2 people') + '. Organize by: essential gear, clothing, food/water, navigation, safety, optional items with weight notes.' } },
    { id: 'safety_plan',    label: '⛑️ Safety Plan',       desc: 'Emergency preparedness and risk assessment', buildPrompt: function(v) { return 'Create a comprehensive safety and emergency plan for a ' + (v.activityType||'backpacking') + ' trip to ' + (v.location||'a remote area') + ' with ' + (v.group||'2 people') + ' for ' + (v.days||'3 days') + '. Include: risk assessment, emergency contacts, navigation basics, weather hazards, wildlife safety, first aid, PLB guidance, and a trip report template.' } },
    { id: 'route_optimizer', label: '📍 Route Optimizer',  desc: 'Optimize your itinerary and logistics',    buildPrompt: function(v) { return 'Optimize a ' + (v.days||'3') + '-day outdoor itinerary in ' + (v.location||'Yosemite') + ' for ' + (v.group||'2 people') + '. Activity: ' + (v.activityType||'hiking') + '. Fitness: ' + (v.fitness||'moderate') + '. Priorities: ' + (v.interests||'waterfalls, wildlife') + '. Include: daily schedule, logistics, best time windows, what to skip.' } },
    { id: 'camp_meal_plan', label: '🍳 Camp Meal Plan',    desc: 'Nutritious backcountry meal plan',          buildPrompt: function(v) { return 'Design a ' + (v.days||'3') + '-day backcountry meal plan for ' + (v.group||'2 people') + ' on a ' + (v.activityType||'backpacking') + ' trip. Activity level: ' + (v.fitness||'high') + '. Dietary restrictions: ' + (v.dietary||'none') + '. Include: all meals and snacks per day, calorie counts, prep instructions, pack weight, and shopping list.' } },
    { id: 'emergency_prep', label: '🆘 Emergency Prep',    desc: 'Build your emergency kit and protocols',   buildPrompt: function(v) { return 'Create a complete wilderness emergency preparedness guide for ' + (v.activityType||'hiking/camping') + ' in ' + (v.location||'remote terrain') + '. Group: ' + (v.group||'2 people') + '. Include: first aid essentials, signaling, shelter-in-place, search-and-rescue process, sat communicator options, and emergency action plans for common scenarios.' } },
    { id: 'weather_guide',  label: '⛈️ Weather Strategy', desc: 'Read and respond to backcountry weather',  buildPrompt: function(v) { return 'Create a weather strategy guide for outdoor activities in ' + (v.location||'mountain terrain') + '. Activity: ' + (v.activityType||'hiking') + '. Cover: reading clouds and signs, lightning protocols, flash flood awareness, heat/cold management, wind chill, best weather windows, and go/no-go decision frameworks.' } },
  ]
}
export function getFields(actionId) {
  const fields = [
    { id: 'location', label: 'Location / Region', placeholder: 'Rocky Mountains, CO' },
    { id: 'activityType', label: 'Activity Type', placeholder: 'Hiking, Backpacking, Kayaking...' },
    { id: 'days', label: 'Duration', placeholder: '3 days' },
    { id: 'group', label: 'Group', placeholder: 'Solo, 2 people, family...' },
    { id: 'fitness', label: 'Fitness Level', placeholder: 'Beginner, Moderate, Advanced' },
    { id: 'interests', label: 'Priorities', placeholder: 'Waterfalls, wildlife, summit views...' },
  ]
  const extra = { camp_meal_plan: [{ id: 'dietary', label: 'Dietary Restrictions', placeholder: 'Vegan, gluten-free, none' }] }
  return { label: 'Trip Details', fields: [...fields, ...(extra[actionId] || [])] }
}
