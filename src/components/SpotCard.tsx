// components/SpotCard.tsx
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import {
  StarFill,
  Plug,
  CarFront,
  Cup,
  People,
  GeoAlt,
} from 'react-bootstrap-icons';
import type { Spot } from '@prisma/client';

interface SpotCardProps {
  spot: Spot & {
    _count?: {
      reviews: number;
    };
  };
}

const SpotCard = ({ spot }: SpotCardProps) => (
  <div className="card h-100 shadow-sm hover-shadow transition-all">
    <Image
      src={spot.imageUrl}
      alt={spot.name}
      height={200}
      style={{ objectFit: 'cover', width: '100%' }}
    />
    <div className="card-body">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="card-title mb-0">{spot.name}</h5>
        <Badge bg="primary">{spot.type}</Badge>
      </div>

      {/* Rating */}
      <div className="mb-2 text-start">
        <StarFill className="text-warning me-1" />
        <span className="fw-bold">{spot.rating.toFixed(1)}</span>
        <span className="text-muted ms-1">
          (
          {spot.numReviews}
          reviews
          )
        </span>
      </div>

      {/* Description */}
      {spot.description && (
        <p className="text-muted mb-3 text-start">
          {spot.description.length > 100
            ? `${spot.description.slice(0, 100)}...`
            : spot.description}
        </p>
      )}

      {/* Amenities - left aligned */}
      <div className="mb-3">
        <div className="d-flex flex-wrap gap-2">
          {spot.hasOutlets && (
            <Badge bg="light" text="dark" className="d-flex align-items-center">
              <Plug className="me-1" />
              Outlets
            </Badge>
          )}
          {spot.hasParking && (
            <Badge bg="light" text="dark" className="d-flex align-items-center">
              <CarFront className="me-1" />
              Parking
            </Badge>
          )}
          {spot.hasFoodDrinks && (
            <Badge bg="light" text="dark" className="d-flex align-items-center">
              <Cup className="me-1" />
              Food/Drinks
            </Badge>
          )}
          <Badge bg="light" text="dark" className="d-flex align-items-center">
            <People className="me-1" />
            Up to
            {spot.maxGroupSize}
          </Badge>
        </div>
      </div>

      {/* Location - left aligned */}
      <div className="text-muted small d-flex align-items-center">
        <GeoAlt className="me-1" />
        {spot.address}
      </div>
    </div>
  </div>
);

export default SpotCard;
