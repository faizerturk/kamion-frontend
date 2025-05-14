import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from 'use-debounce';
import { Search } from 'lucide-react';
import Input from '../atoms/Input';

interface SearchInputProps {
  onSearch: (value: string) => void;
  placeholder?: string;
}

//TODO Fix ui
export default function SearchInput({
  onSearch,
  placeholder = 'Search...',
}: SearchInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [debouncedValue] = useDebounce(inputValue, 500);

  const handleDebouncedSearch = useCallback(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  useEffect(() => {
    handleDebouncedSearch();
  }, [handleDebouncedSearch]);

  return (
    <Input
      type='text'
      placeholder={placeholder}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      icon={<Search size={16} />}
    />
  );
}
