import TextField from "@mui/material/TextField";

interface Props {
  search: string;
  setSearch: (value: string) => void;
}

const SearchBar = ({ search, setSearch }: Props) => {
  return (
    <TextField
      placeholder="Search flowers..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      size="small"
      sx={{
        width: 350,

        "& .MuiOutlinedInput-root": {
          borderRadius: 3,
          bgcolor: "#fff",
        },
      }}
    />
  );
};

export default SearchBar;
