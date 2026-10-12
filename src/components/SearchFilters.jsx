import { useState } from "react";

const categories = ["Music", "Sports", "Arts & Theatre", "Film", "Miscellaneous"];

function SearchFilters({ filters, onSearch }) {
  const [keyword, setKeyword] = useState(filters.keyword);
  const [category, setCategory] = useState(filters.category);
  const [city, setCity] = useState(filters.city);
  const [date, setDate] = useState(filters.date);

  function handleSubmit(e) {
    e.preventDefault();
    onSearch({ keyword: keyword.trim(), category, city: city.trim(), date });
  }

  function handleClear() {
    setKeyword("");
    setCategory("");
    setCity("");
    setDate("");
    onSearch({ keyword: "", category: "", city: "", date: "" });
  }

  return (
    <form className="filters" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search events..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <button type="submit">Search</button>
      <button type="button" className="secondary" onClick={handleClear}>Clear</button>
    </form>
  );
}

export default SearchFilters;
