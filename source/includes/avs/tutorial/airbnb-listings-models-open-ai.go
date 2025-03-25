package common

import (
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
)

type Image struct {
	ThumbnailURL string `bson:"thumbnail_url"`
	MediumURL    string `bson:"medium_url"`
	PictureURL   string `bson:"picture_url"`
	XLPictureURL string `bson:"xl_picture_url"`
}

type Host struct {
	ID                 string   `bson:"host_id"`
	URL                string   `bson:"host_url"`
	Name               string   `bson:"host_name"`
	Location           string   `bson:"host_location"`
	About              string   `bson:"host_about"`
	ThumbnailURL       string   `bson:"host_thumbnail_url"`
	PictureURL         string   `bson:"host_picture_url"`
	Neighborhood       string   `bson:"host_neighborhood"`
	IsSuperhost        bool     `bson:"host_is_superhost"`
	HasProfilePic      bool     `bson:"host_has_profile_pic"`
	IdentityVerified   bool     `bson:"host_identity_verified"`
	ListingsCount      int32    `bson:"host_listings_count"`
	TotalListingsCount int32    `bson:"host_total_listings_count"`
	Verifications      []string `bson:"host_verifications"`
}

type Location struct {
	Type            string    `bson:"type"`
	Coordinates     []float64 `bson:"coordinates"`
	IsLocationExact bool      `bson:"is_location_exact"`
}

type Address struct {
	Street         string   `bson:"street"`
	Suburb         string   `bson:"suburb"`
	GovernmentArea string   `bson:"government_area"`
	Market         string   `bson:"market"`
	Country        string   `bson:"Country"`
	CountryCode    string   `bson:"country_code"`
	Location       Location `bson:"location"`
}

type Availability struct {
	Thirty         int32 `bson:"availability_30"`
	Sixty          int32 `bson:"availability_60"`
	Ninety         int32 `bson:"availability_90"`
	ThreeSixtyFive int32 `bson:"availability_365"`
}

type ReviewScores struct {
	Accuracy      int32 `bson:"review_scores_accuracy"`
	Cleanliness   int32 `bson:"review_scores_cleanliness"`
	CheckIn       int32 `bson:"review_scores_checkin"`
	Communication int32 `bson:"review_scores_communication"`
	Location      int32 `bson:"review_scores_location"`
	Value         int32 `bson:"review_scores_value"`
	Rating        int32 `bson:"review_scores_rating"`
}

type Review struct {
	ID           string    `bson:"_id"`
	Date         time.Time `bson:"date,omitempty"`
	ListingId    string    `bson:"listing_id"`
	ReviewerId   string    `bson:"reviewer_id"`
	ReviewerName string    `bson:"reviewer_name"`
	Comments     string    `bson:"comments"`
}

type Listing struct {
	ID                   string          `bson:"_id"`
	ListingURL           string          `bson:"listing_url"`
	Name                 string          `bson:"name"`
	Summary              string          `bson:"summary"`
	Space                string          `bson:"space"`
	Description          string          `bson:"description"`
	NeighborhoodOverview string          `bson:"neighborhood_overview"`
	Notes                string          `bson:"notes"`
	Transit              string          `bson:"transit"`
	Access               string          `bson:"access"`
	Interaction          string          `bson:"interaction"`
	HouseRules           string          `bson:"house_rules"`
	PropertyType         string          `bson:"property_type"`
	RoomType             string          `bson:"room_type"`
	BedType              string          `bson:"bed_type"`
	MinimumNights        string          `bson:"minimum_nights"`
	MaximumNights        string          `bson:"maximum_nights"`
	CancellationPolicy   string          `bson:"cancellation_policy"`
	LastScraped          time.Time       `bson:"last_scraped,omitempty"`
	CalendarLastScraped  time.Time       `bson:"calendar_last_scraped,omitempty"`
	FirstReview          time.Time       `bson:"first_review,omitempty"`
	LastReview           time.Time       `bson:"last_review,omitempty"`
	Accommodates         int32           `bson:"accommodates"`
	Bedrooms             int32           `bson:"bedrooms"`
	Beds                 int32           `bson:"beds"`
	NumberOfReviews      int32           `bson:"number_of_reviews"`
	Bathrooms            bson.Decimal128 `bson:"bathrooms"`
	Amenities            []string        `bson:"amenities"`
	Price                bson.Decimal128 `bson:"price"`
	WeeklyPrice          bson.Decimal128 `bson:"weekly_price"`
	MonthlyPrice         bson.Decimal128 `bson:"monthly_price"`
	CleaningFee          bson.Decimal128 `bson:"cleaning_fee"`
	ExtraPeople          bson.Decimal128 `bson:"extra_people"`
	GuestsIncluded       bson.Decimal128 `bson:"guests_included"`
	Image                Image           `bson:"images"`
	Host                 Host            `bson:"host"`
	Address              Address         `bson:"address"`
	Availability         Availability    `bson:"availability"`
	ReviewScores         ReviewScores    `bson:"review_scores"`
	Reviews              []Review        `bson:"reviews"`
	Embeddings           []float64       `bson:"embeddings,omitempty"`
}
