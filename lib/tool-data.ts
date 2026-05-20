// lib/tool-data.ts — javari-outdoors
// Tool definitions extracted from page.tsx to keep JSX parser clean
// CR AudioViz AI · May 2026

const ACTIONS = [
  { id: 'trail_planner',  label: '🗺️ Trail Planner',     desc: 'Get personalized trail recommendations',   prompt: (v) => `Recommend the best hiking trails in ${v.location || 'the United States'} for a ${v.fitness || 'moderate'} fitness level. Trip duration: ${v.days || '1 day'}. Group: ${v.group || 'solo'}. Interests: ${v.interests || 'scenic views, nature'}. Include: trail names, difficulty, distance, elevation, best season, parking, and key highlights for each.` },
  { id: 'gear_checklist', label: '🎒 Gear Checklist',     desc: 'Complete packing list for your adventure',  prompt: (v) => `Create a comprehensive gear checklist for a ${v.activityType || 'hiking'} trip in ${v.location || 'the mountains'} for ${v.days || '3 days'}. Season: ${v.season || 'summer'}. Experience level: ${v.fitness || 'intermediate'}. Group size: ${v.group || '2 people'}. Organize by: essential gear, clothing, food/water, navigation, safety, and optional items. Include weight considerations.` },
  { id: 'safety_plan',    label: '⛑️ Safety Plan',        desc: 'Emergency preparedness and risk assessment', prompt: (v) => `Create a comprehensive safety and emergency plan for a ${v.activityType || 'backpacking'} trip to ${v.location || 'a remote area'} with ${v.group || '2 people'} for ${v.days || '3 days'}. Include: risk assessment, emergency contacts, navigation basics, weather hazards, wildlife safety, first aid essentials, PLB/satellite communicator guidance, and a trip report template to leave with a contact.` },
  { id: 'route_optimizer',label: '📍 Route Optimizer',    desc: 'Optimize your itinerary and logistics',      prompt: (v) => `Optimize an outdoor itinerary for ${v.days || '3 days'} in ${v.location || 'Yosemite National Park'} for ${v.group || '2 people'}. Activity type: ${v.activityType || 'hiking'}. Fitness: ${v.fitness || 'moderate'}. Priorities: ${v.interests || 'waterfalls, wildlife, sunrise views'}. Include: daily schedule, driving/shuttling logistics, best time windows, and what to skip.` },
  { id: 'camp_meal_plan', label: '🍳 Camp Meal Plan',      desc: 'Nutritious meal plan for the backcountry',   prompt: (v) => `Design a ${v.days || '3'}-day backcountry meal plan for ${v.group || '2 people'} on a ${v.activityType || 'backpacking'} trip. Activity level: ${v.fitness || 'high'}. Dietary restrictions: ${v.dietary || 'none'}. Include: breakfast, lunch, dinner, and snacks for each day, calorie counts, prep instructions, pack weight, and shopping list.` },
  { id: 'emergency_prep', label: '🆘 Emergency Prep',      desc: 'Build your emergency kit and protocols',     prompt: (v) => `Create a complete wilderness emergency preparedness guide for ${v.activityType || 'hiking/camping'} in ${v.location || 'remote terrain'}. Group: ${v.group || '2 people'}. Include: first aid essentials, emergency signaling, shelter-in-place protocols, search-and-rescue process, sat communicator options, and step-by-step emergency action plans for common scenarios.` },
  { id: 'weather_guide',  label: '⛈️ Weather Strategy',   desc: 'Read and respond to backcountry weather',    prompt: (v) => `Create a comprehensive weather strategy guide for outdoor activities in ${v.location || 'mountain terrain'}. Activity: ${v.activityType || 'hiking'}. Cover: how to read clouds and signs, lightning protocols, flash flood awareness, heat/cold management, wind chill factors, best weather windows, and decision-making frameworks for go/no-go decisions.` },
]


const COMMON_FIELDS = [
  { id: 'location',     label: 'Location / Region', placeholder: 'Rocky Mountains, CO  /  Appalachian Trail, GA' },
  { id: 'activityType', label: 'Activity Type',     placeholder: 'Hiking, Backpacking, Kayaking, Climbing...' },
  { id: 'days',         label: 'Trip Duration',     placeholder: '3 days' },
  { id: 'group',        label: 'Group',             placeholder: 'Solo, 2 people, family with kids...' },
  { id: 'fitness',      label: 'Fitness Level',     placeholder: 'Beginner, Moderate, Advanced, Expert' },
  { id: 'interests',    label: 'Priorities / Interests', placeholder: 'Waterfalls, wildlife, summit views...' },
]
