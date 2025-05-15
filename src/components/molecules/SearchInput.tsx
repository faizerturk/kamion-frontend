import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from 'use-debounce';
import { Search } from 'lucide-react';
import styled from 'styled-components';
import colors from '@/public/style/colors';

interface SearchInputProps {
  onSearch: (value: string) => void;
  placeholder?: string;
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 40rem;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 8px 36px 8px 16px;
  border: none;
  border-radius: 20px;
  background-color: #ffffff;
  box-shadow: 0px 4px 24px rgba(38, 37, 38, 0.04);
  font-size: 14px;
  color: #262526;

  &::placeholder {
    color: ${colors.darkerBlue};
  }

  &:focus {
    outline: none;
    box-shadow: 0px 4px 24px rgba(38, 37, 38, 0.1);
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  pointer-events: none;
  color: ${colors.darkerBlue};
`;

export default function SearchInput({
  onSearch,
  placeholder = 'Arayın…',
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
    <Wrapper>
      <StyledInput
        type='text'
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <IconWrapper>
        <Search size={16} />
      </IconWrapper>
    </Wrapper>
  );
}
