import { allCountries } from "country-telephone-data";

export default function DialCodeDropdown({ onSelect }) {
  // dédoublonne puis trie numériquement
  const cleaned = {};
  allCountries.forEach(({ name, dialCode }) => {
    const code = `+${dialCode}`;
    if (!cleaned[code]) {
      // garde uniquement la partie avant "(" ou ","
      cleaned[code] = name.split(/[,(]/)[0].trim();
    }
  });

  const dialList = Object.entries(cleaned)          // [[“+1”,“Canada”],…]
    .sort((a, b) => parseInt(a[0]) - parseInt(b[0]));

  return (
    <ul className="dropdown-menu overflow-auto" style={{ maxHeight: "18rem" }}>
      {dialList.map(([code, country]) => (
        <li key={code}>
          <button
            type="button"
            className="dropdown-item"
            onClick={() => onSelect(code)}
          >
            {code} {country}
          </button>
        </li>
      ))}
    </ul>
  );
}