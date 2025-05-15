import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import SearchInput from '../molecules/SearchInput';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import {
  fetchShipmentsAsync,
  setFilter,
} from '@/src/store/slices/shipmentSlice';
import colors from '@/public/style/colors';
import ShipmentRow from '../molecules/ShipmentRow';

// {message: "Attempt to read property "currency_code" on null", exception: "ErrorException",…}
// exception
// :
// "ErrorException"
// file
// :
// "/var/www/app/Http/Resources/Shipper/Shipment/Price/KamionPercentResource.php"
// line
// :
// 20
// message
// :
// "Attempt to read property \"currency_code\" on null"
// trace
// :
// [{file: "/var/www/app/Http/Resources/Shipper/Shipment/Price/KamionPercentResource.php", line: 20,…},…]

export default function ShipmentTable() {
  const dispatch = useAppDispatch();
  const { shipments, loading, filter, currentPage, hasMore } = useAppSelector(
    (state) => state.shipment
  );
  const { token } = useAppSelector((state) => state.auth);

  // const loadMore = useCallback(() => {
  //   if (!loading && hasMore) {
  //     dispatch(fetchShipmentsAsync({ page: currentPage + 1, id: filter.id }));
  //   }
  // }, [dispatch, loading, hasMore, currentPage, filter.id]);

  useEffect(() => {
    if (token && shipments.length === 0 && !loading) {
      dispatch(fetchShipmentsAsync({ page: 1, id: filter.id }));
    }
  }, [dispatch, token, shipments.length, loading, filter.id]);

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
          <HeaderCell width='4rem'>ID</HeaderCell>
          <HeaderCell>FİRMA</HeaderCell>
          <HeaderCell width='17rem'>GÜZERGAH</HeaderCell>
          <HeaderCell>ARAÇ</HeaderCell>
          <HeaderCell>ŞÖFÖR</HeaderCell>
          <HeaderCell>TARİH</HeaderCell>
          <HeaderCell>FİYAT</HeaderCell>
          <HeaderCell>DURUM</HeaderCell>
        </RowHeader>

        {shipments.map((s) => (
          <ShipmentRow key={s.id} shipment={s} />
        ))}
        {/* <Body>
          {loading && <LoadingText>Yükleniyor...</LoadingText>}

          //Infinite scroll kapalı: manuel buton *
          {!loading && hasMore && (
            <LoadMoreButton onClick={loadMore}>Daha fazla yükle</LoadMoreButton>
          )}
        </Body> 
        */}
      </Card>
    </>
  );
}

/* STYLED COMPONENTS */
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
  padding: 0.75rem 1rem;
`;
const HeaderCell = styled.div<{ shrink?: boolean; width?: string }>`
  flex: ${({ shrink, width }) =>
    shrink ? '0 0 2.5rem' : width ? `0 0 ${width}` : '1'};
  font-size: 0.875rem;
  color: #374151;
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
const LoadMoreButton = styled.button`
  margin: 1rem auto;
  padding: 0.5rem 1.5rem;
  background: ${colors.darkerBlue};
  color: #fff;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    opacity: 0.9;
  }
`;
