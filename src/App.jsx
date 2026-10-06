import { useState } from "react";
import "./App.css";

const initialTrips = [
  {
    id: 1,
    name: "Goa Beach Escape",
    destination: "Goa",
    date: "2026-10-15",
    price: 18500,
    duration: "3 Days / 2 Nights",
    status: "Active",
  },
  {
    id: 2,
    name: "Kerala Backwater Tour",
    destination: "Kerala",
    date: "2026-10-20",
    price: 24000,
    duration: "4 Days / 3 Nights",
    status: "Active",
  },
  {
    id: 3,
    name: "Ooty Hill Station",
    destination: "Ooty",
    date: "2026-10-25",
    price: 12500,
    duration: "2 Days / 1 Night",
    status: "Active",
  },
  {
    id: 4,
    name: "Manali Adventure",
    destination: "Manali",
    date: "2026-11-02",
    price: 32000,
    duration: "5 Days / 4 Nights",
    status: "Active",
  },
  {
    id: 5,
    name: "Rajasthan Heritage",
    destination: "Rajasthan",
    date: "2026-11-10",
    price: 28000,
    duration: "5 Days / 4 Nights",
    status: "Active",
  },
  {
    id: 6,
    name: "Kashmir Paradise",
    destination: "Kashmir",
    date: "2026-11-18",
    price: 35000,
    duration: "6 Days / 5 Nights",
    status: "Active",
  },
  {
    id: 7,
    name: "Mysore Palace Tour",
    destination: "Mysore",
    date: "2026-11-25",
    price: 11000,
    duration: "2 Days / 1 Night",
    status: "Active",
  },
];

const initialCustomers = [
  {
    id: 1,
    name: "Arun Kumar",
    email: "arun@gmail.com",
    phone: "9876543210",
    bookings: 3,
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya@gmail.com",
    phone: "9876543211",
    bookings: 2,
  },
  {
    id: 3,
    name: "Rahul Kumar",
    email: "rahul@gmail.com",
    phone: "9876543212",
    bookings: 4,
  },
  {
    id: 4,
    name: "Divya Raj",
    email: "divya@gmail.com",
    phone: "9876543213",
    bookings: 1,
  },
];

const initialBookings = [
  {
    id: 1,
    bookingId: "BK001",
    customer: "Arun Kumar",
    trip: "Goa Beach Escape",
    date: "2026-10-15",
    amount: 18500,
    status: "Confirmed",
    payment: "Paid",
  },
  {
    id: 2,
    bookingId: "BK002",
    customer: "Priya Sharma",
    trip: "Kerala Backwater Tour",
    date: "2026-10-20",
    amount: 24000,
    status: "Pending",
    payment: "Pending",
  },
  {
    id: 3,
    bookingId: "BK003",
    customer: "Rahul Kumar",
    trip: "Ooty Hill Station",
    date: "2026-10-25",
    amount: 12500,
    status: "Confirmed",
    payment: "Paid",
  },
  {
    id: 4,
    bookingId: "BK004",
    customer: "Divya Raj",
    trip: "Manali Adventure",
    date: "2026-11-02",
    amount: 32000,
    status: "Cancelled",
    payment: "Refunded",
  },
];

const destinationData = [
  {
    name: "Goa",
    country: "India",
    trips: 12,
    emoji: "🏖️",
  },
  {
    name: "Kerala",
    country: "India",
    trips: 9,
    emoji: "🌴",
  },
  {
    name: "Ooty",
    country: "India",
    trips: 7,
    emoji: "⛰️",
  },
  {
    name: "Manali",
    country: "India",
    trips: 6,
    emoji: "🏔️",
  },
  {
    name: "Rajasthan",
    country: "India",
    trips: 5,
    emoji: "🏰",
  },
  {
    name: "Kashmir",
    country: "India",
    trips: 8,
    emoji: "🏔️",
  },
  {
    name: "Mysore",
    country: "India",
    trips: 4,
    emoji: "🏛️",
  },
];

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  const [trips, setTrips] = useState(initialTrips);
  const [customers] = useState(initialCustomers);
  const [bookings, setBookings] = useState(initialBookings);

  const [showTripModal, setShowTripModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [editingTrip, setEditingTrip] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [tripToDelete, setTripToDelete] = useState(null);

  const [search, setSearch] = useState("");
  const [destinationFilter, setDestinationFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  const [bookingSearch, setBookingSearch] = useState("");
  const [bookingStatusFilter, setBookingStatusFilter] =
    useState("All");

  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);

  const [tripForm, setTripForm] = useState({
    name: "",
    destination: "",
    date: "",
    price: "",
    duration: "",
  });

  const tripsPerPage = 4;

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const openAddTrip = () => {
    setEditingTrip(null);

    setTripForm({
      name: "",
      destination: "",
      date: "",
      price: "",
      duration: "",
    });

    setShowTripModal(true);
  };

  const openEditTrip = (trip) => {
    setEditingTrip(trip);

    setTripForm({
      name: trip.name,
      destination: trip.destination,
      date: trip.date,
      price: trip.price,
      duration: trip.duration,
    });

    setShowTripModal(true);
  };

  const openViewTrip = (trip) => {
    setSelectedTrip(trip);
    setShowViewModal(true);
  };

  const openDeleteModal = (trip) => {
    setTripToDelete(trip);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!tripToDelete) return;

    setTrips((prev) =>
      prev.filter((trip) => trip.id !== tripToDelete.id)
    );

    setShowDeleteModal(false);
    setTripToDelete(null);

    showToast("Trip deleted successfully");
  };

  const saveTrip = (e) => {
    e.preventDefault();

    if (
      !tripForm.name.trim() ||
      !tripForm.destination ||
      !tripForm.date ||
      !tripForm.price ||
      !tripForm.duration.trim()
    ) {
      showToast("Please fill all fields");
      return;
    }

    if (Number(tripForm.price) <= 0) {
      showToast("Price must be greater than 0");
      return;
    }

    if (editingTrip) {
      setTrips((prev) =>
        prev.map((trip) =>
          trip.id === editingTrip.id
            ? {
                ...trip,
                ...tripForm,
                price: Number(tripForm.price),
              }
            : trip
        )
      );

      showToast("Trip updated successfully");
    } else {
      const newTrip = {
        id: Date.now(),
        ...tripForm,
        price: Number(tripForm.price),
        status: "Active",
      };

      setTrips((prev) => [newTrip, ...prev]);

      showToast("Trip created successfully");
    }

    setShowTripModal(false);
    setCurrentPage(1);
  };

  const updateBookingStatus = (id, status) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id
          ? { ...booking, status }
          : booking
      )
    );

    showToast("Booking status updated");
  };

  const updatePaymentStatus = (id, payment) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id
          ? { ...booking, payment }
          : booking
      )
    );

    showToast("Payment status updated");
  };

  /* =========================
     TRIP FILTER + SORT
  ========================= */

  let filteredTrips = trips.filter((trip) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      trip.name.toLowerCase().includes(searchText) ||
      trip.destination.toLowerCase().includes(searchText);

    const matchesDestination =
      destinationFilter === "All" ||
      trip.destination === destinationFilter;

    const matchesDate =
      !dateFilter || trip.date === dateFilter;

    const matchesPrice =
      !maxPrice || Number(trip.price) <= Number(maxPrice);

    return (
      matchesSearch &&
      matchesDestination &&
      matchesDate &&
      matchesPrice
    );
  });

  if (sortBy === "priceLow") {
    filteredTrips.sort((a, b) => a.price - b.price);
  }

  if (sortBy === "priceHigh") {
    filteredTrips.sort((a, b) => b.price - a.price);
  }

  if (sortBy === "dateOld") {
    filteredTrips.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  }

  if (sortBy === "dateNew") {
    filteredTrips.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }

  if (sortBy === "nameAZ") {
    filteredTrips.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  const totalPages = Math.ceil(
    filteredTrips.length / tripsPerPage
  );

  const safePage =
    totalPages === 0
      ? 1
      : Math.min(currentPage, totalPages);

  const startIndex = (safePage - 1) * tripsPerPage;

  const paginatedTrips = filteredTrips.slice(
    startIndex,
    startIndex + tripsPerPage
  );

  const resetTripFilters = () => {
    setSearch("");
    setDestinationFilter("All");
    setDateFilter("");
    setMaxPrice("");
    setSortBy("default");
    setCurrentPage(1);
  };

  /* =========================
     BOOKINGS FILTER
  ========================= */

  const filteredBookings = bookings.filter((booking) => {
    const text = bookingSearch.toLowerCase();

    const matchesSearch =
      booking.customer.toLowerCase().includes(text) ||
      booking.trip.toLowerCase().includes(text) ||
      booking.bookingId.toLowerCase().includes(text);

    const matchesStatus =
      bookingStatusFilter === "All" ||
      booking.status === bookingStatusFilter;

    return matchesSearch && matchesStatus;
  });

  /* =========================
     STATISTICS
  ========================= */

  const totalRevenue = bookings
    .filter((booking) => booking.payment === "Paid")
    .reduce((sum, booking) => sum + booking.amount, 0);

  const activeTrips = trips.filter(
    (trip) => trip.status === "Active"
  ).length;

  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "Confirmed"
  ).length;

  const paidBookings = bookings.filter(
    (booking) => booking.payment === "Paid"
  ).length;

  const pendingPayments = bookings.filter(
    (booking) => booking.payment === "Pending"
  ).length;

  const refundedBookings = bookings.filter(
    (booking) => booking.payment === "Refunded"
  ).length;

  const menuItems = [
    "Dashboard",
    "Destinations",
    "Trips",
    "Customers",
    "Bookings",
    "Payments",
    "Calendar",
  ];

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePageChange = (page) => {
    setActivePage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="app">
      {/* =========================
          SIDEBAR
      ========================= */}

      <aside className="sidebar">
        <div className="logo">
          ✈️{" "}
          <span>
            Travel<span className="logo-accent">Pro</span>
          </span>
        </div>

        <nav>
          {menuItems.map((item) => (
            <button
              key={item}
              className={`nav-item ${
                activePage === item ? "active" : ""
              }`}
              onClick={() => handlePageChange(item)}
            >
              <span>
                {item === "Dashboard" && "📊"}
                {item === "Destinations" && "🌍"}
                {item === "Trips" && "🧳"}
                {item === "Customers" && "👥"}
                {item === "Bookings" && "🎫"}
                {item === "Payments" && "💳"}
                {item === "Calendar" && "📅"}
              </span>

              {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* =========================
          MAIN
      ========================= */}

      <main className="main">
        <header className="topbar">
          <div>
            <h1>{activePage}</h1>
            <p>Manage your travel business</p>
          </div>

          <div className="profile">
            <div className="avatar">IS</div>

            <div>
              <strong>Admin</strong>
              <small>Travel Manager</small>
            </div>
          </div>
        </header>

        {/* =========================
            DASHBOARD
        ========================= */}

        {activePage === "Dashboard" && (
          <section className="page-content">
            <div className="welcome-card">
              <div>
                <h2>Welcome back! 👋</h2>

                <p>
                  Here's what's happening with your travel
                  business today.
                </p>
              </div>

              <span className="welcome-icon">✈️</span>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">🧳</div>

                <div>
                  <span>Total Trips</span>
                  <h2>{trips.length}</h2>
                  <small>{activeTrips} active trips</small>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">🎫</div>

                <div>
                  <span>Total Bookings</span>
                  <h2>{bookings.length}</h2>
                  <small>
                    {confirmedBookings} confirmed
                  </small>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">👥</div>

                <div>
                  <span>Customers</span>
                  <h2>{customers.length}</h2>
                  <small>Registered customers</small>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">💰</div>

                <div>
                  <span>Revenue</span>

                  <h2>
                    ₹{totalRevenue.toLocaleString()}
                  </h2>

                  <small>{paidBookings} paid bookings</small>
                </div>
              </div>
            </div>

            <div className="dashboard-grid">
              <div className="panel chart-panel">
                <div className="panel-header">
                  <div>
                    <h3>Booking Analytics</h3>
                    <p>Monthly booking performance</p>
                  </div>

                  <select>
                    <option>2026</option>
                    <option>2025</option>
                  </select>
                </div>

                <div className="chart">
                  {[55, 75, 60, 90, 70, 85, 65].map(
                    (height, index) => (
                      <div
                        className="bar-container"
                        key={index}
                      >
                        <div
                          className="bar"
                          style={{
                            height: `${height}%`,
                          }}
                        />

                        <span>
                          {
                            [
                              "Apr",
                              "May",
                              "Jun",
                              "Jul",
                              "Aug",
                              "Sep",
                              "Oct",
                            ][index]
                          }
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="panel">
                <div className="panel-header">
                  <div>
                    <h3>Popular Destinations</h3>
                    <p>Most booked places</p>
                  </div>
                </div>

                <div className="destination-list">
                  {destinationData
                    .slice(0, 4)
                    .map((destination) => (
                      <div
                        className="destination-row"
                        key={destination.name}
                      >
                        <div className="destination-emoji">
                          {destination.emoji}
                        </div>

                        <div>
                          <strong>{destination.name}</strong>
                          <small>
                            {destination.country}
                          </small>
                        </div>

                        <span>
                          {destination.trips} trips
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <div>
                  <h3>Recent Bookings</h3>
                  <p>Latest customer bookings</p>
                </div>
              </div>

              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Booking ID</th>
                      <th>Customer</th>
                      <th>Trip</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Payment</th>
                    </tr>
                  </thead>

                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id}>
                        <td>{booking.bookingId}</td>
                        <td>{booking.customer}</td>
                        <td>{booking.trip}</td>
                        <td>{booking.date}</td>

                        <td>
                          <span
                            className={`status ${booking.status.toLowerCase()}`}
                          >
                            {booking.status}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`status ${booking.payment.toLowerCase()}`}
                          >
                            {booking.payment}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* =========================
            DESTINATIONS
        ========================= */}

        {activePage === "Destinations" && (
          <section className="page-content">
            <div className="page-heading">
              <div>
                <h2>Destination Management</h2>
                <p>
                  Explore and manage your travel destinations
                </p>
              </div>

              <button
                className="primary-btn"
                onClick={() =>
                  showToast(
                    "Destination creation is ready for next update"
                  )
                }
              >
                + Add Destination
              </button>
            </div>

            <div className="destination-cards">
              {destinationData.map((destination) => (
                <div
                  className="destination-card"
                  key={destination.name}
                >
                  <div className="destination-image">
                    {destination.emoji}
                  </div>

                  <div className="destination-info">
                    <h3>{destination.name}</h3>

                    <p>
                      📍 {destination.country}
                    </p>

                    <span>
                      {destination.trips} available trips
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =========================
            TRIPS
        ========================= */}

        {activePage === "Trips" && (
          <section className="page-content">
            <div className="page-heading">
              <div>
                <h2>Trip Management</h2>
                <p>
                  Create, edit and manage your travel trips
                </p>
              </div>

              <button
                className="primary-btn"
                onClick={openAddTrip}
              >
                + Create Trip
              </button>
            </div>

            {/* FILTERS */}

            <div className="filter-bar">
              <input
                type="text"
                placeholder="🔍 Search trips..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />

              <select
                value={destinationFilter}
                onChange={(e) => {
                  setDestinationFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">
                  All Destinations
                </option>

                {destinationData.map((destination) => (
                  <option
                    key={destination.name}
                    value={destination.name}
                  >
                    {destination.name}
                  </option>
                ))}
              </select>

              <input
                type="date"
                value={dateFilter}
                onChange={(e) => {
                  setDateFilter(e.target.value);
                  setCurrentPage(1);
                }}
              />

              <input
                type="number"
                placeholder="Max price"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(e.target.value);
                  setCurrentPage(1);
                }}
              />

              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="default">Sort By</option>
                <option value="nameAZ">Name A-Z</option>
                <option value="priceLow">
                  Price Low → High
                </option>
                <option value="priceHigh">
                  Price High → Low
                </option>
                <option value="dateOld">
                  Date Old → New
                </option>
                <option value="dateNew">
                  Date New → Old
                </option>
              </select>

              <button
                className="secondary-btn"
                onClick={resetTripFilters}
              >
                Reset
              </button>
            </div>

            {/* TABLE */}

            <div className="panel">
              {loading ? (
                <div className="empty-state">
                  Loading trips...
                </div>
              ) : paginatedTrips.length === 0 ? (
                <div className="empty-state">
                  No trips found. Try changing your filters.
                </div>
              ) : (
                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>Trip</th>
                        <th>Destination</th>
                        <th>Date</th>
                        <th>Duration</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {paginatedTrips.map((trip) => (
                        <tr key={trip.id}>
                          <td>
                            <strong>{trip.name}</strong>
                          </td>

                          <td>{trip.destination}</td>

                          <td>{trip.date}</td>

                          <td>{trip.duration}</td>

                          <td>
                            ₹
                            {Number(
                              trip.price
                            ).toLocaleString()}
                          </td>

                          <td>
                            <span className="status active">
                              {trip.status}
                            </span>
                          </td>

                          <td>
                            <div className="action-buttons">
                              <button
                                className="view-btn"
                                onClick={() =>
                                  openViewTrip(trip)
                                }
                              >
                                View
                              </button>

                              <button
                                className="edit-btn"
                                onClick={() =>
                                  openEditTrip(trip)
                                }
                              >
                                Edit
                              </button>

                              <button
                                className="delete-btn"
                                onClick={() =>
                                  openDeleteModal(trip)
                                }
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* PAGINATION */}

              {totalPages > 1 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: "20px",
                  }}
                >
                  <button
                    className="secondary-btn"
                    disabled={safePage === 1}
                    onClick={() =>
                      changePage(safePage - 1)
                    }
                  >
                    Previous
                  </button>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((page) => (
                    <button
                      key={page}
                      className={
                        page === safePage
                          ? "primary-btn"
                          : "secondary-btn"
                      }
                      onClick={() => changePage(page)}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    className="secondary-btn"
                    disabled={safePage === totalPages}
                    onClick={() =>
                      changePage(safePage + 1)
                    }
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* =========================
            CUSTOMERS
        ========================= */}

        {activePage === "Customers" && (
          <section className="page-content">
            <div className="page-heading">
              <div>
                <h2>Customer Management</h2>
                <p>Manage your travel customers</p>
              </div>
            </div>

            <div className="panel">
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Total Bookings</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {customers.map((customer) => (
                      <tr key={customer.id}>
                        <td>
                          <strong>{customer.name}</strong>
                        </td>

                        <td>{customer.email}</td>

                        <td>{customer.phone}</td>

                        <td>{customer.bookings}</td>

                        <td>
                          <button
                            className="view-btn"
                            onClick={() =>
                              showToast(
                                `Viewing ${customer.name}`
                              )
                            }
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* =========================
            BOOKINGS
        ========================= */}

        {activePage === "Bookings" && (
          <section className="page-content">
            <div className="page-heading">
              <div>
                <h2>Booking Management</h2>
                <p>
                  Manage customer bookings and status
                </p>
              </div>
            </div>

            <div className="filter-bar">
              <input
                type="text"
                placeholder="🔍 Search booking..."
                value={bookingSearch}
                onChange={(e) =>
                  setBookingSearch(e.target.value)
                }
              />

              <select
                value={bookingStatusFilter}
                onChange={(e) =>
                  setBookingStatusFilter(e.target.value)
                }
              >
                <option value="All">
                  All Booking Status
                </option>
                <option value="Confirmed">
                  Confirmed
                </option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">
                  Cancelled
                </option>
              </select>
            </div>

            <div className="panel">
              {filteredBookings.length === 0 ? (
                <div className="empty-state">
                  No bookings found.
                </div>
              ) : (
                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>Booking ID</th>
                        <th>Customer</th>
                        <th>Trip</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Booking Status</th>
                        <th>Payment Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredBookings.map((booking) => (
                        <tr key={booking.id}>
                          <td>
                            <strong>
                              {booking.bookingId}
                            </strong>
                          </td>

                          <td>{booking.customer}</td>

                          <td>{booking.trip}</td>

                          <td>{booking.date}</td>

                          <td>
                            ₹
                            {booking.amount.toLocaleString()}
                          </td>

                          <td>
                            <select
                              value={booking.status}
                              onChange={(e) =>
                                updateBookingStatus(
                                  booking.id,
                                  e.target.value
                                )
                              }
                            >
                              <option>Confirmed</option>
                              <option>Pending</option>
                              <option>Cancelled</option>
                            </select>
                          </td>

                          <td>
                            <select
                              value={booking.payment}
                              onChange={(e) =>
                                updatePaymentStatus(
                                  booking.id,
                                  e.target.value
                                )
                              }
                            >
                              <option>Paid</option>
                              <option>Pending</option>
                              <option>Refunded</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        )}

        {/* =========================
            PAYMENTS
        ========================= */}

        {activePage === "Payments" && (
          <section className="page-content">
            <div className="page-heading">
              <div>
                <h2>Payment Management</h2>
                <p>
                  Track booking payments and refunds
                </p>
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">💰</div>

                <div>
                  <span>Total Revenue</span>

                  <h2>
                    ₹{totalRevenue.toLocaleString()}
                  </h2>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">✅</div>

                <div>
                  <span>Paid Bookings</span>
                  <h2>{paidBookings}</h2>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">⏳</div>

                <div>
                  <span>Pending Payments</span>
                  <h2>{pendingPayments}</h2>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">↩️</div>

                <div>
                  <span>Refunds</span>
                  <h2>{refundedBookings}</h2>
                </div>
              </div>
            </div>

            <div className="panel">
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Booking ID</th>
                      <th>Customer</th>
                      <th>Amount</th>
                      <th>Payment Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id}>
                        <td>{booking.bookingId}</td>

                        <td>{booking.customer}</td>

                        <td>
                          ₹
                          {booking.amount.toLocaleString()}
                        </td>

                        <td>
                          <span
                            className={`status ${booking.payment.toLowerCase()}`}
                          >
                            {booking.payment}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* =========================
            CALENDAR
        ========================= */}

        {activePage === "Calendar" && (
          <section className="page-content">
            <div className="page-heading">
              <div>
                <h2>Travel Calendar</h2>
                <p>
                  View upcoming trips and bookings
                </p>
              </div>
            </div>

            <div className="panel calendar-panel">
              <div className="calendar-header">
                <button
                  onClick={() =>
                    showToast("Previous month")
                  }
                >
                  ‹
                </button>

                <h3>October 2026</h3>

                <button
                  onClick={() =>
                    showToast("Next month")
                  }
                >
                  ›
                </button>
              </div>

              <div className="calendar-grid">
                {[
                  "Sun",
                  "Mon",
                  "Tue",
                  "Wed",
                  "Thu",
                  "Fri",
                  "Sat",
                ].map((day) => (
                  <div
                    className="calendar-day-name"
                    key={day}
                  >
                    {day}
                  </div>
                ))}

                {Array.from(
                  { length: 31 },
                  (_, index) => (
                    <div
                      className="calendar-date"
                      key={index}
                    >
                      <span>{index + 1}</span>

                      {[
                        15,
                        20,
                        25,
                      ].includes(index + 1) && (
                        <small>Trip</small>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          </section>
        )}

        {/* =========================
            ADD / EDIT TRIP MODAL
        ========================= */}

        {showTripModal && (
          <div
            className="modal-overlay"
            onClick={() => setShowTripModal(false)}
          >
            <div
              className="modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div>
                  <h2>
                    {editingTrip
                      ? "Edit Trip"
                      : "Create New Trip"}
                  </h2>

                  <p>Enter trip information</p>
                </div>

                <button
                  className="close-btn"
                  onClick={() =>
                    setShowTripModal(false)
                  }
                >
                  ×
                </button>
              </div>

              <form onSubmit={saveTrip}>
                <label>Trip Name</label>

                <input
                  type="text"
                  placeholder="Enter trip name"
                  value={tripForm.name}
                  onChange={(e) =>
                    setTripForm({
                      ...tripForm,
                      name: e.target.value,
                    })
                  }
                />

                <label>Destination</label>

                <select
                  value={tripForm.destination}
                  onChange={(e) =>
                    setTripForm({
                      ...tripForm,
                      destination: e.target.value,
                    })
                  }
                >
                  <option value="">
                    Select destination
                  </option>

                  {destinationData.map((destination) => (
                    <option
                      key={destination.name}
                      value={destination.name}
                    >
                      {destination.name}
                    </option>
                  ))}
                </select>

                <label>Travel Date</label>

                <input
                  type="date"
                  value={tripForm.date}
                  onChange={(e) =>
                    setTripForm({
                      ...tripForm,
                      date: e.target.value,
                    })
                  }
                />

                <label>Price</label>

                <input
                  type="number"
                  placeholder="Enter price"
                  min="1"
                  value={tripForm.price}
                  onChange={(e) =>
                    setTripForm({
                      ...tripForm,
                      price: e.target.value,
                    })
                  }
                />

                <label>Duration</label>

                <input
                  type="text"
                  placeholder="Example: 3 Days / 2 Nights"
                  value={tripForm.duration}
                  onChange={(e) =>
                    setTripForm({
                      ...tripForm,
                      duration: e.target.value,
                    })
                  }
                />

                <div className="modal-actions">
                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={() =>
                      setShowTripModal(false)
                    }
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="primary-btn"
                  >
                    {editingTrip
                      ? "Update Trip"
                      : "Create Trip"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* =========================
            VIEW TRIP MODAL
        ========================= */}

        {showViewModal && selectedTrip && (
          <div
            className="modal-overlay"
            onClick={() => setShowViewModal(false)}
          >
            <div
              className="modal details-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div>
                  <h2>Trip Details</h2>
                  <p>
                    Complete information about this trip
                  </p>
                </div>

                <button
                  className="close-btn"
                  onClick={() =>
                    setShowViewModal(false)
                  }
                >
                  ×
                </button>
              </div>

              <div className="trip-details">
                <div className="detail-icon">✈️</div>

                <h2>{selectedTrip.name}</h2>

                <p className="detail-destination">
                  📍 {selectedTrip.destination}
                </p>

                <div className="detail-grid">
                  <div>
                    <span>Travel Date</span>
                    <strong>
                      {selectedTrip.date}
                    </strong>
                  </div>

                  <div>
                    <span>Duration</span>
                    <strong>
                      {selectedTrip.duration}
                    </strong>
                  </div>

                  <div>
                    <span>Price</span>
                    <strong>
                      ₹
                      {Number(
                        selectedTrip.price
                      ).toLocaleString()}
                    </strong>
                  </div>

                  <div>
                    <span>Status</span>
                    <strong>
                      {selectedTrip.status}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  className="primary-btn"
                  onClick={() =>
                    setShowViewModal(false)
                  }
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================
            DELETE MODAL
        ========================= */}

        {showDeleteModal && tripToDelete && (
          <div
            className="modal-overlay"
            onClick={() =>
              setShowDeleteModal(false)
            }
          >
            <div
              className="modal confirmation-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="confirmation-icon">
                ⚠️
              </div>

              <h2>Delete Trip?</h2>

              <p>
                Are you sure you want to delete{" "}
                <strong>{tripToDelete.name}</strong>?
              </p>

              <div className="modal-actions">
                <button
                  className="secondary-btn"
                  onClick={() =>
                    setShowDeleteModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  className="delete-confirm-btn"
                  onClick={confirmDelete}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================
            TOAST
        ========================= */}

        {toast && <div className="toast">{toast}</div>}
      </main>
    </div>
  );
}

export default App;











