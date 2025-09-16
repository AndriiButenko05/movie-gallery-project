import css from "./SearchBar.module.css";

interface SearchBarProps {
  onChange: (newSearch: string) => void;
  value: string;
}

export default function SearchBar({ onChange, value }: SearchBarProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={css.boxInput}>
      <div className={css.border}>
        <input
          className={css.input}
          type="text"
          placeholder="Search movies"
          onChange={handleChange}
          value={value}
        />
      </div>
    </div>
  );
}
