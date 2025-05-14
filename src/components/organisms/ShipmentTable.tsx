// src/components/organisms/ShipmentTable.tsx
import React, { useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import SearchInput from '../molecules/SearchInput';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import {
  fetchShipmentsAsync,
  setFilter,
} from '@/src/store/slices/shipmentSlice';
import colors from '@/public/style/colors';
import ShipmentRow from '../molecules/ShipmentRow';

export default function ShipmentTable() {
  const dispatch = useAppDispatch();
  const { shipments, loading, filter, currentPage, hasMore } = useAppSelector(
    (state) => state.shipment
  );
  const { token } = useAppSelector((state) => state.auth);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      dispatch(fetchShipmentsAsync({ page: currentPage + 1, id: filter.id }));
    }
  }, [dispatch, loading, hasMore, currentPage, filter.id]);

  useEffect(() => {
    if (token && shipments.length === 0) {
      dispatch(fetchShipmentsAsync({ page: 1 }));
    }
  }, [dispatch, token]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );
    const current = loaderRef.current;
    current && observer.observe(current);
    return () => current && observer.unobserve(current);
  }, [loadMore, hasMore, loading]);

  const handleSearch = (value: string) => {
    if (value !== filter.id) {
      dispatch(setFilter({ id: value }));
      dispatch(fetchShipmentsAsync({ page: 1, id: value }));
    }
  };

  return (
    <>
      <CardHeader>
        <HeaderTitle>Taşımalarım</HeaderTitle>
        <SearchWrapper>
          <SearchInput onSearch={handleSearch} placeholder='Arayın...' />
        </SearchWrapper>
      </CardHeader>

      <Card>
        <RowHeader>
          <HeaderCell shrink={true}>SEÇ</HeaderCell>
          <HeaderCell>ID</HeaderCell>
          <HeaderCell>FİRMA</HeaderCell>
          <HeaderCell>GÜZERGAH</HeaderCell>
          <HeaderCell>ARAÇ</HeaderCell>
          <HeaderCell>ŞÖFÖR</HeaderCell>
          <HeaderCell>TARİH</HeaderCell>
          <HeaderCell>FİYAT</HeaderCell>
          <HeaderCell>DURUM</HeaderCell>
        </RowHeader>

        <Body>
          {shipments.map((s) => (
            <ShipmentRow key={s.id} shipment={s} />
          ))}

          {loading && <LoadingText>Yükleniyor...</LoadingText>}
          <Loader ref={loaderRef} />
        </Body>
      </Card>
    </>
  );
}

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;
const HeaderTitle = styled.h2`
  font-size: 1.25rem;
  color: ${colors.darkerBlue};
  font-weight: 500;
`;
const SearchWrapper = styled.div`
  width: 16rem;
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 0.75rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const RowHeader = styled.div`
  display: flex;
  align-items: center;
  background: transparent;
  padding: 0.75rem 1rem;
`;
const HeaderCell = styled.div<{ shrink?: boolean }>`
  flex: ${({ shrink }) => (shrink ? '0 0 2.5rem' : '1')};
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;
const LoadingText = styled.div`
  padding: 1rem;
  text-align: center;
  color: #6b7280;
`;

const Loader = styled.div`
  height: 1px;
`;
