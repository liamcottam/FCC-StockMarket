<template>
  <div>
    <div class="form-container">
      <button class="form-btn" @click="addItem" :disabled="!isValid">Add</button>
      <div class="input-container">
        <input v-model="input" @keydown.enter.prevent="addItem" placeholder="Add new stock" />
      </div>
      <div v-if="error" class="error">
        <span>Error: {{ error }}</span>
        <span style="height: 16px; width: 16px; float: right; cursor: pointer;" @click="error = null">
          <svg width="16" height="16" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
            <path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z" />
          </svg>
        </span>
      </div>
    </div>
    <div class="cards">
      <div class="card" v-for="(item, index) in data" v-bind:key="index">
        <div class="card-content">
          <span @click="removeItem(index)">
            <!-- https://github.com/encharm/Font-Awesome-SVG-PNG/blob/master/black/svg/close.svg?short_path=3e9c065 -->
            <svg width="20" height="20" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
              <path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z" />
            </svg>
          </span>
          <h3 class="card-title">{{ item.name }}</h3>
          <p>{{ item.longName }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      error: null,
    };
  },
  methods: {
    removeItem(idx) {
      this.$socket.emit('remove', this.data[idx].name);
      this.$store.dispatch('removeItem', this.data[idx].name);
    },
    addItem() {
      if (!this.isValid) return;
      this.$store.dispatch('addItem', this.input.toUpperCase()).then(() => {
        this.input = '';
        this.error = null;
      }).catch(() => { this.error = 'Could not add item'; });
    },
  },
  computed: {
    isValid() {
      return this.input.length !== 0;
    },
    data() {
      return this.$store.state.data;
    },
  },
};
</script>

<style lang="scss">
.cards {
  $inner-spacing: 0.2rem;

  display: flex;
  flex-wrap: wrap;
  margin-left: -$inner-spacing;
  margin-right: -$inner-spacing;

  .card {
    display: flex;
    width: 100%;
    @media (min-width: 768px) {
      width: 50%;
    }
    @media (min-width: 992px) {
      width: 33.33%;
    }
  }

  .card-content {
    width: 100%;
    margin: $inner-spacing;
    padding: 1rem;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);

    .card-title {
      text-transform: uppercase;
      margin: 0;
      padding: 0;
      word-break: break-all;
      font-weight: 500;
    }

    span {
      float: right;
      user-select: none;

      svg path {
        fill: #ff0033;
      }
    }

    p {
      color: #A0A0A2;
    }
  }
}

.form-container,
.form-container:focus {
  position: relative;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
  border: honeydew;
  background-color: #fff;
  vertical-align: top;
  outline: none;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.15s ease-in-out;
  margin-bottom: 0.4rem;

  .error {
    padding: 3px 9px;
    font-size: 14px;
    border-top: 1px solid rgba(0, 0, 0, 0.16);
    color: red;

    span {
      height: 100%;
    }
  }

  &:hover {
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.08);
  }

  .input-container {
    position: relative;
    height: 34px;
    overflow: hidden;
    padding: 0 9px;

    input {
      width: 100%;
      height: 100%;
      padding: 0;
      border: none;
      outline: none;
      font-size: 14px;
      user-select: none;
    }
  }

  .form-btn {
    background: transparent;
    border: 0;
    float: right;
    margin-top: 1px;
    height: 34px;
    outline: 0;
    padding-right: 16px;
    padding-left: 16px;
    position: relative;
    top: -1px;
    color: white;
    background-color: #5cb85c;
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
    }
  }
}
</style>
