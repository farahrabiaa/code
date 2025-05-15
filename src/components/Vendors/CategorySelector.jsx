import React, { useState } from 'react';

export default function CategorySelector({ availableCategories, selectedCategories, onChange, loading }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = searchTerm
    ? availableCategories.filter(cat => cat.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : availableCategories;

  const handleCategoryToggle = (categoryId) => {
    const newSelectedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    
    onChange(newSelectedCategories);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="بحث عن تصنيف..."
          className="flex-1 border rounded-md px-3 py-2"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto border rounded-md p-4">
            {filteredCategories.length > 0 ? (
              filteredCategories.map(category => (
                <label key={category.id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryToggle(category.id)}
                    className="rounded text-blue-600"
                  />
                  <span>{category.name}</span>
                </label>
              ))
            ) : (
              <div className="col-span-full text-center py-4 text-gray-500">
                لا توجد تصنيفات متطابقة مع البحث
              </div>
            )}
          </div>

          <div className="mt-4">
            <h4 className="font-medium text-gray-700 mb-2">التصنيفات المحددة ({selectedCategories.length})</h4>
            <div className="flex flex-wrap gap-2">
              {selectedCategories.length > 0 ? (
                selectedCategories.map(categoryId => {
                  const category = availableCategories.find(c => c.id === categoryId);
                  return (
                    <span 
                      key={categoryId} 
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center"
                    >
                      {category ? category.name : 'تصنيف غير معروف'}
                      <button
                        type="button"
                        onClick={() => handleCategoryToggle(categoryId)}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  );
                })
              ) : (
                <span className="text-gray-500">لم يتم تحديد أي تصنيف</span>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}