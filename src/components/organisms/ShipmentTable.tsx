import React, { useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import SearchInput from '../molecules/SearchInput';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import {
  fetchShipmentsAsync,
  setFilter,
} from '@/src/store/slices/shipmentSlice';
import colors from '@/public/style/colors';
import ShipmentRow from '../molecules/ShipmentRow';
import Image from 'next/image';
import party from '../../../public/assets/party.png';
import close from '../../../public/assets/close.png';

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
  const [showBanner, setShowBanner] = useState(true);
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
      {showBanner && (
        <Banner>
          <BannerLeft>
            <Image src={party.src} alt='Firma' width={15} height={15} />
            <span>
              <BannetTitle>Kamion Duyuru</BannetTitle> Güncellendi. Hemen
              İndirerek, Fırsatları Yakalayabilirsiniz.
            </span>
          </BannerLeft>
          <CloseButton onClick={() => setShowBanner(false)}>
            <Image src={close.src} alt='Firma' width={16} height={16} />
          </CloseButton>
        </Banner>
      )}
      <CardHeader>
        <HeaderTitle>Taşımalarım</HeaderTitle>
        <SearchWrapper>
          <SearchInput onSearch={handleSearch} placeholder='Arayın...' />
        </SearchWrapper>
      </CardHeader>

      <Card>
        <RowHeader>
          <HeaderCell shrink={true}>SEÇ</HeaderCell>
          <HeaderCell width='6rem'>ID</HeaderCell>
          <HeaderCell>FİRMA</HeaderCell>
          <HeaderCell width='18rem'>GÜZERGAH</HeaderCell>
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

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const HeaderTitle = styled.h2`
  font-size: 1.25rem;
  color: ${colors.darkerBlue};
  font-weight: 500;
`;

const BannetTitle = styled.span`
  color: rgba(93, 95, 239, 1);
  font-weight: 500;
`;

const SearchWrapper = styled.div`
  width: 16rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 0.75rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  overflow-x: auto;
`;

const Banner = styled.div`
  background: #e4e4ff;
  color: rgba(62, 87, 138, 1);
  padding: 0.75rem 1rem;
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const BannerLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
`;

const RowHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  min-width: 700px;
  background: rgba(246, 246, 246, 1);

  @media (max-width: 768px) {
    padding: 0.5rem 0.75rem;
    display: none;
  }
`;

const HeaderCell = styled.div<{ shrink?: boolean; width?: string }>`
  flex: ${({ shrink, width }) =>
    shrink ? '0 0 2.5rem' : width ? `0 0 ${width}` : '1'};
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  font-weight: 500;
  text-transform: uppercase;
  background-color: rgba(246, 246, 246, 1);
  white-space: nowrap;
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
