import useDashboardUI from '../../hooks/useDashboardUI';

function ProductView() {
  useDashboardUI(); 

  return (
<div class="container grid-wrap">
<div class="row g-3">
 
  <div class="col-12 col-md-6 mb-30">
  <div class="order-card">
    <div class="order-card__header">
      <span class="order-card__id">#CM9801</span>
      <span class="badge-status badge-inprogress">In Progress</span>
    </div>
    <div class="order-row">
      <span class="order-row__label">User</span>
      <span class="order-row__value order-row__user">
        <img src="https://i.pravatar.cc/40?img=47" alt="Natali Craig" />
        Natali Craig
      </span>
    </div>
    <div class="order-row">
      <span class="order-row__label">Project</span>
      <span class="order-row__value">Landing Page</span>
    </div>
    <div class="order-row">
      <span class="order-row__label">Address</span>
      <span class="order-row__value">Meadow Lane Oakland</span>
    </div>
    <div class="order-row">
      <span class="order-row__label">Date</span>
      <span class="order-row__value">Just now</span>
    </div>
  </div>
  </div>
 
  <div class="col-12 col-md-6 mb-30">
  <div class="order-card">
    <div class="order-card__header">
      <span class="order-card__id">#CM9802</span>
      <span class="badge-status badge-complete">Complete</span>
    </div>
    <div class="order-row">
      <span class="order-row__label">User</span>
      <span class="order-row__value order-row__user">
        <img src="https://i.pravatar.cc/40?img=32" alt="Kate Morrison" />
        Kate Morrison
      </span>
    </div>
    <div class="order-row">
      <span class="order-row__label">Project</span>
      <span class="order-row__value">CRM Admin pages</span>
    </div>
    <div class="order-row">
      <span class="order-row__label">Address</span>
      <span class="order-row__value">Larry San Francisco</span>
    </div>
    <div class="order-row">
      <span class="order-row__label">Date</span>
      <span class="order-row__value">A minute ago</span>
    </div>
  </div>
  </div>
 
  <div class="col-12 col-md-6 mb-30">
  <div class="order-card">
    <div class="order-card__header">
      <span class="order-card__id">#CM9803</span>
      <span class="badge-status badge-pending">Pending</span>
    </div>
    <div class="order-row">
      <span class="order-row__label">User</span>
      <span class="order-row__value order-row__user">
        <img src="https://i.pravatar.cc/40?img=12" alt="Drew Cano" />
        Drew Cano
      </span>
    </div>
    <div class="order-row">
      <span class="order-row__label">Project</span>
      <span class="order-row__value">Client Project</span>
    </div>
    <div class="order-row">
      <span class="order-row__label">Address</span>
      <span class="order-row__value">Bagwell Avenue Ocala</span>
    </div>
    <div class="order-row">
      <span class="order-row__label">Date</span>
      <span class="order-row__value">1 hour ago</span>
    </div>
  </div>
  </div>
 
</div>
</div>

  )
}

export default ProductView
