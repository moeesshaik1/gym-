import React, { useState } from 'react';
import {
  Apple,
  Plus,
  Trash2,
  Droplet,
  Search,
  Check,
  X,
  Flame,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';
import { FoodItem } from '../../types';

export const NutritionView: React.FC = () => {
  const {
    user,
    foodDatabase,
    loggedFoods,
    logFood,
    removeLoggedFood,
    updateFoodPortion,
    addCustomFood,
    waterIntakeMl,
    addWater,
    resetWater,
  } = useFitness();

  const [activeModalMeal, setActiveModalMeal] = useState<
    'Breakfast' | 'Lunch' | 'Snack' | 'Dinner' | null
  >(null);
  const [foodSearch, setFoodSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showCustomModal, setShowCustomModal] = useState(false);

  // Custom food form state
  const [customName, setCustomName] = useState('');
  const [customHindi, setCustomHindi] = useState('');
  const [customServing, setCustomServing] = useState('100g');
  const [customCals, setCustomCals] = useState(200);
  const [customProt, setCustomProt] = useState(15);
  const [customCarb, setCustomCarb] = useState(20);
  const [customFat, setCustomFat] = useState(5);
  const [customFiber, setCustomFiber] = useState(2);

  const todayStr = new Date().toISOString().split('T')[0];
  const todayFoods = loggedFoods.filter(f => f.date === todayStr);

  const totalCals = Math.round(todayFoods.reduce((acc, f) => acc + f.calories * f.servings, 0));
  const totalProt = Math.round(todayFoods.reduce((acc, f) => acc + f.protein * f.servings, 0));
  const totalCarb = Math.round(todayFoods.reduce((acc, f) => acc + f.carbs * f.servings, 0));
  const totalFat = Math.round(todayFoods.reduce((acc, f) => acc + f.fat * f.servings, 0));
  const totalFiber = Math.round(todayFoods.reduce((acc, f) => acc + f.fiber * f.servings, 0));

  const mealTypes: ('Breakfast' | 'Lunch' | 'Snack' | 'Dinner')[] = [
    'Breakfast',
    'Lunch',
    'Snack',
    'Dinner',
  ];

  const filteredFoods = foodDatabase.filter(food => {
    const matchSearch =
      food.name.toLowerCase().includes(foodSearch.toLowerCase()) ||
      (food.hindiName && food.hindiName.includes(foodSearch)) ||
      food.category.toLowerCase().includes(foodSearch.toLowerCase());
    const matchCat = selectedCategory === 'All' || food.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const handleCreateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName) return;
    addCustomFood({
      name: customName,
      hindiName: customHindi,
      category: 'Custom',
      servingSizeGrams: 100,
      servingLabel: customServing,
      calories: customCals,
      protein: customProt,
      carbs: customCarb,
      fat: customFat,
      fiber: customFiber,
      isVeg: true,
    });
    setShowCustomModal(false);
    setCustomName('');
  };

  const waterLiters = (waterIntakeMl / 1000).toFixed(1);
  const waterTargetL = user.waterTarget.toFixed(1);
  const waterPercent = Math.min(100, Math.round((waterIntakeMl / (user.waterTarget * 1000)) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-150">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Nutrition Engine</span>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white mt-1">
            NUTRITION & MEAL PLANNER
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track daily macros with verified Indian home-cooked meals, proteins, and fluid balance.
          </p>
        </div>

        <button
          onClick={() => setShowCustomModal(true)}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4 text-emerald-400" />
          <span>Add Custom Food</span>
        </button>
      </div>

      {/* Daily Macros Overview Banner */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Calories */}
        <div className="p-5 rounded-2xl bg-[#0D1219] border border-slate-800 md:col-span-2 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Daily Calories</span>
            <span className="text-xs font-bold text-orange-400">
              {Math.min(100, Math.round((totalCals / user.calorieTarget) * 100))}%
            </span>
          </div>
          <div>
            <span className="text-3xl font-display font-black text-white">{totalCals.toLocaleString()}</span>
            <span className="text-xs text-slate-400 ml-1.5">/ {user.calorieTarget.toLocaleString()} kcal</span>
          </div>
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-orange-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (totalCals / user.calorieTarget) * 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400">
            Target calculated for <strong className="text-white">{user.goal}</strong> phase.
          </p>
        </div>

        {/* Protein */}
        <div className="p-5 rounded-2xl bg-[#0D1219] border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Protein</span>
          <div className="text-xl font-display font-black text-white">
            {totalProt} <span className="text-xs text-slate-400 font-normal">/ {user.proteinTarget}g</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full"
              style={{ width: `${Math.min(100, (totalProt / user.proteinTarget) * 100)}%` }}
            />
          </div>
          <span className="text-[11px] text-emerald-400 font-medium">
            {Math.max(0, user.proteinTarget - totalProt)}g remaining
          </span>
        </div>

        {/* Carbs */}
        <div className="p-5 rounded-2xl bg-[#0D1219] border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Carbs</span>
          <div className="text-xl font-display font-black text-white">
            {totalCarb} <span className="text-xs text-slate-400 font-normal">/ {user.carbsTarget}g</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-full rounded-full"
              style={{ width: `${Math.min(100, (totalCarb / user.carbsTarget) * 100)}%` }}
            />
          </div>
          <span className="text-[11px] text-blue-400 font-medium">Fiber: {totalFiber}g logged</span>
        </div>

        {/* Fats */}
        <div className="p-5 rounded-2xl bg-[#0D1219] border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Fats</span>
          <div className="text-xl font-display font-black text-white">
            {totalFat} <span className="text-xs text-slate-400 font-normal">/ {user.fatTarget}g</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full"
              style={{ width: `${Math.min(100, (totalFat / user.fatTarget) * 100)}%` }}
            />
          </div>
          <span className="text-[11px] text-amber-400 font-medium">
            {Math.max(0, user.fatTarget - totalFat)}g remaining
          </span>
        </div>
      </div>

      {/* Visual Water Tracker Section */}
      <div className="p-6 rounded-3xl bg-[#0D1219] border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          {/* Animated Water Cylinder */}
          <div className="relative w-16 h-24 rounded-2xl bg-slate-900 border-2 border-blue-500/30 overflow-hidden flex flex-col justify-end p-1 shadow-lg shadow-blue-500/10">
            <div
              className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-xl transition-all duration-500"
              style={{ height: `${waterPercent}%` }}
            />
            <span className="absolute inset-0 flex items-center justify-center font-mono text-xs font-black text-white drop-shadow">
              {waterPercent}%
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Droplet className="w-4 h-4 fill-current" />
              <span>Hydration Tracker</span>
            </div>
            <h3 className="text-2xl font-display font-black text-white">
              {waterLiters} / {waterTargetL} Liters
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Drinking adequate fluids enhances muscle protein synthesis and endurance.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => addWater(250)}
            className="px-4 py-2.5 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-blue-300 font-bold text-xs transition-colors cursor-pointer"
          >
            +250 ml (Glass)
          </button>
          <button
            onClick={() => addWater(500)}
            className="px-4 py-2.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 text-blue-300 font-bold text-xs transition-colors cursor-pointer"
          >
            +500 ml (Shaker)
          </button>
          <button
            onClick={() => addWater(1000)}
            className="px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-black font-extrabold text-xs transition-colors shadow-lg shadow-blue-500/20 cursor-pointer"
          >
            +1.0 Liter
          </button>
          <button
            onClick={resetWater}
            className="px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-500 hover:text-slate-300 text-xs transition-colors cursor-pointer"
            title="Reset today's water"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Meal Planner Slots (Breakfast, Lunch, Snack, Dinner) */}
      <div className="space-y-6">
        <h2 className="text-xl font-display font-bold text-white">
          TODAY'S MEAL PROTOCOL
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mealTypes.map(mealType => {
            const items = todayFoods.filter(f => f.mealType === mealType);
            const mealCals = Math.round(
              items.reduce((acc, f) => acc + f.calories * f.servings, 0)
            );
            const mealProt = Math.round(
              items.reduce((acc, f) => acc + f.protein * f.servings, 0)
            );

            return (
              <div
                key={mealType}
                className="p-5 rounded-3xl bg-[#0D1219] border border-slate-800 space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h3 className="text-base font-bold text-white uppercase tracking-wide">
                      {mealType}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      {mealCals} kcal · {mealProt}g protein
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveModalMeal(mealType)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Food</span>
                  </button>
                </div>

                {/* Logged Foods List */}
                <div className="space-y-2 min-h-[60px]">
                  {items.length === 0 ? (
                    <p className="text-xs text-slate-500 italic py-4 text-center">
                      No foods logged for {mealType} yet.
                    </p>
                  ) : (
                    items.map(item => (
                      <div
                        key={item.loggedId}
                        className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between text-xs"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-white">{item.name}</span>
                            {item.hindiName && (
                              <span className="text-[11px] text-slate-400 font-normal">
                                ({item.hindiName})
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400">
                            {Math.round(item.calories * item.servings)} kcal ·{' '}
                            {Math.round(item.protein * item.servings)}g P ·{' '}
                            {Math.round(item.carbs * item.servings)}g C
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          {/* Portion Stepper */}
                          <div className="flex items-center gap-1 bg-slate-800 rounded-lg px-2 py-1">
                            <span className="text-[11px] font-mono font-bold text-emerald-400">
                              {item.servings}x
                            </span>
                            <div className="flex flex-col ml-1">
                              <button
                                onClick={() =>
                                  updateFoodPortion(item.loggedId, item.servings + 0.5)
                                }
                                className="text-[10px] text-slate-400 hover:text-white leading-none"
                              >
                                ▲
                              </button>
                              <button
                                onClick={() =>
                                  updateFoodPortion(
                                    item.loggedId,
                                    Math.max(0.5, item.servings - 0.5)
                                  )
                                }
                                className="text-[10px] text-slate-400 hover:text-white leading-none"
                              >
                                ▼
                              </button>
                            </div>
                          </div>

                          <button
                            onClick={() => removeLoggedFood(item.loggedId)}
                            className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Food Modal with Indian Foods Catalog */}
      {activeModalMeal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-[#0D1219] border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Add Food to {activeModalMeal}
                </h3>
                <p className="text-xs text-slate-400">
                  Select from Indian culinary database or search by dish
                </p>
              </div>
              <button
                onClick={() => setActiveModalMeal(null)}
                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search and Category Filters */}
            <div className="p-4 border-b border-slate-800 space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search Roti, Dal, Paneer, Chicken, Biryani..."
                  value={foodSearch}
                  onChange={e => setFoodSearch(e.target.value)}
                  autoFocus
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {['All', 'Indian Staples', 'Proteins', 'Dairy', 'Grains', 'Fruits & Veg', 'Snacks', 'Custom'].map(
                  cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-emerald-500 text-black font-bold'
                          : 'bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Food Items List */}
            <div className="p-4 overflow-y-auto space-y-2 flex-1">
              {filteredFoods.map(food => (
                <div
                  key={food.id}
                  className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 flex items-center justify-between text-xs transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{food.name}</span>
                      {food.hindiName && (
                        <span className="text-xs text-slate-400 font-normal">
                          ({food.hindiName})
                        </span>
                      )}
                      {food.isVeg ? (
                        <span className="w-2 h-2 rounded-full bg-emerald-500" title="Vegetarian" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-rose-500" title="Non-Vegetarian" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {food.servingLabel} · <strong className="text-white">{food.calories} kcal</strong> ·{' '}
                      <span className="text-emerald-400 font-semibold">{food.protein}g protein</span> ·{' '}
                      {food.carbs}g carbs · {food.fat}g fat
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      logFood(food, 1, activeModalMeal);
                      setActiveModalMeal(null);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              ))}

              {filteredFoods.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                  <p>No foods found matching "{foodSearch}".</p>
                  <button
                    onClick={() => {
                      setShowCustomModal(true);
                      setActiveModalMeal(null);
                    }}
                    className="mt-2 text-xs text-emerald-400 font-bold hover:underline"
                  >
                    + Create Custom Food
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Custom Food Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-[#0D1219] border border-slate-800 rounded-3xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <h3 className="text-base font-bold text-white">Create Custom Food</h3>
              <button
                onClick={() => setShowCustomModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCustom} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Food Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grandma's Besan Chilla"
                  value={customName}
                  onChange={e => setCustomName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Hindi / Local Name (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. बेसन चीला"
                  value={customHindi}
                  onChange={e => setCustomHindi(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Serving Label</label>
                <input
                  type="text"
                  placeholder="1 piece (80g)"
                  value={customServing}
                  onChange={e => setCustomServing(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Calories (kcal)</label>
                  <input
                    type="number"
                    value={customCals}
                    onChange={e => setCustomCals(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Protein (g)</label>
                  <input
                    type="number"
                    value={customProt}
                    onChange={e => setCustomProt(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Carbs (g)</label>
                  <input
                    type="number"
                    value={customCarb}
                    onChange={e => setCustomCarb(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Fats (g)</label>
                  <input
                    type="number"
                    value={customFat}
                    onChange={e => setCustomFat(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Save Custom Food
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
