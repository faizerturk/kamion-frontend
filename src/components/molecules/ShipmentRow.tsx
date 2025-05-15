'use client';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import frameCube from '@/public/assets/frameCube.png';
import frameBus from '@/public/assets/frameBus.png';
import colors from '@/public/style/colors';

//TODO chech values
interface Address {
  type_value: string;
  city: { name: string };
  district: { name: string };
}
interface Shipment {
  id: number | string;
  shipper?: { name?: string };
  departure_address?: Address;
  delivery_address?: Address | null;
  shipment_detail?: { vehicle_type_value?: string } | null;
  driver?: { name: string; phone: string; avatarUrl?: string } | null;
  pick_up_date?: number;
  price?: { shipper?: { freight_price?: number } } | null;
  latest_status?: { type_value?: string } | null;
  carrier_payment_status_value?: string | null;
}

interface Props {
  shipment: Shipment;
}

export default function ShipmentRow({ shipment }: Props) {
  const {
    id,
    shipper,
    departure_address,
    delivery_address,
    shipment_detail,
    driver,
    pick_up_date,
    price,
    latest_status,
    carrier_payment_status_value,
  } = shipment;

  const formattedDate = pick_up_date
    ? new Date(pick_up_date * 1000).toLocaleDateString('tr-TR')
    : '–';

  const priceText =
    price?.shipper?.freight_price != null
      ? `${price.shipper.freight_price.toLocaleString('tr-TR')}₺`
      : '–';

  const statusText =
    latest_status?.type_value ?? carrier_payment_status_value ?? '–';

  return (
    <Row>
      <Cell shrink>
        <Checkbox />
      </Cell>
      <Cell width='4rem'>
        <DarkBold>{id}</DarkBold>
      </Cell>

      <Cell>
        {shipper?.name ? (
          <IconText>
            <Image src={frameCube.src} alt='Firma' width={32} height={32} />
            <DarkMedium>{shipper.name}</DarkMedium>
          </IconText>
        ) : (
          '–'
        )}
      </Cell>

      <Cell width='17rem'>
        {departure_address ? (
          <>
            <Route>
              <Dot color='#2563EB' />
              <RouteText>
                <DarkMedium>{`${departure_address.type_value}`}, </DarkMedium>,
                {`${departure_address.city.name}, ${departure_address.district.name}`}
              </RouteText>
            </Route>
            {delivery_address ? (
              <Route>
                <DotOutline color='#2563EB' />
                <RouteText>
                  <DarkMedium>{`${delivery_address.type_value}`}, </DarkMedium>
                  {`${delivery_address.city.name}, ${delivery_address.district.name}`}
                </RouteText>
              </Route>
            ) : null}
          </>
        ) : (
          '–'
        )}
      </Cell>

      <Cell>
        {shipment_detail?.vehicle_type_value ? (
          <IconText>
            <Image src={frameBus.src} alt='Araç' width={32} height={32} />
            <DarkMedium>{shipment_detail.vehicle_type_value}</DarkMedium>
          </IconText>
        ) : (
          '–'
        )}
      </Cell>

      <Cell>
        {driver ? (
          <DriverInfo>
            {driver.avatarUrl && <Avatar src={driver.avatarUrl} />}
            <div>
              <DarkMedium>{driver.name}</DarkMedium>
              <DarkThin>{driver.phone}</DarkThin>
            </div>
          </DriverInfo>
        ) : (
          '–'
        )}
      </Cell>

      <Cell>
        <DarkMedium>{formattedDate}</DarkMedium>
      </Cell>

      <Cell>
        <PriceBadge>
          <DarkBold>{priceText}</DarkBold>
        </PriceBadge>
      </Cell>

      <Cell>
        <StatusBadge status={statusText}>{statusText}</StatusBadge>
      </Cell>
    </Row>
  );
}

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  width: 1rem;
  height: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.2rem;
  background-color: white;
  cursor: pointer;

  &:checked {
    background-color: ${colors.darkerBlue};
    border-color: ${colors.darkerBlue};
  }
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 0.75rem 1rem;
  border-top: 1px solid #f3f4f6;
  gap: 1rem;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem 0.5rem;
  }
`;

const Cell = styled.div<{ shrink?: boolean; width?: string }>`
  flex: ${({ shrink, width }) =>
    shrink ? '0 0 2.5rem' : width ? `0 0 ${width}` : '1'};
  font-size: 0.875rem;
  color: #374151;
  min-width: ${({ width }) => width || 'auto'};

  @media (max-width: 768px) {
    flex: 1 1 100%;
    width: 100%;
  }
`;

const IconText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const DarkBold = styled.span`
  font-weight: 600;
  color: ${colors.darkerBlue};
`;
const DarkMedium = styled.span`
  font-weight: 500;
  color: ${colors.darkerBlue};
`;
const DarkThin = styled.p`
  font-weight: 400;
  color: ${colors.darkerBlue};
`;

const Route = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
`;
const RouteText = styled.span`
  font-size: 0.875rem;
  color: #374151;
`;
const Dot = styled.span<{ color: string }>`
  width: 0.5rem;
  height: 0.5rem;
  background: ${({ color }) => color};
  border-radius: 50%;
  margin-right: 0.5rem;
`;
const DotOutline = styled(Dot)`
  background: #fff;
  border: 1px solid ${({ color }) => color};
`;

const DriverInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const Avatar = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
`;

const PriceBadge = styled.div`
  display: inline-block;
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  background: rgba(250, 250, 250, 1);
  border-radius: 9999px;
`;

const getStatusStyles = (status: string) => {
  switch (status) {
    case 'Araç tedariği yapıldı':
      return { bg: 'rgba(218, 245, 236, 1)', color: 'rgba(31, 203, 145, 1)' };
    case 'İncelemede / Bekleniyor':
      return { bg: 'rgba(242, 243, 244, 1)', color: 'rgba(9, 34, 86, 1)' };
    case 'Yük yayınlandı':
      return { bg: 'rgba(253, 187, 96, 0.12)', color: 'rgba(224, 132, 4, 1)' };
    default:
      return { bg: '#E5E7EB', color: '#374151' };
  }
};
const StatusBadge = styled.span<{ status: string }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 10rem;
  padding: 0.5rem 0;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${({ status }) => getStatusStyles(status).bg};
  color: ${({ status }) => getStatusStyles(status).color};
  border-radius: 9999px;
  text-align: center;
`;
