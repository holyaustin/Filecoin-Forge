<template>
  <div v-if="!s3">
    <v-skeleton-loader
      class="mt-2"
      type="article"
      max-width="500"
    ></v-skeleton-loader>
  </div>
  <div v-else>
    <div class="breadcrumbs">
      <v-breadcrumbs :items="breadcrumbsItems">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </div>
    <e-right-opt-wrap :top="-55">
      <div class="btn-wrap d-flex justify-end">
        <v-btn color="primary" @click="showPop = true" width="120">
          <!-- <v-icon size="16">mdi-plus-circle-outline</v-icon> -->
          <img src="/img/svg/add1.svg" width="12" />
          <span class="ml-2">Add</span>
        </v-btn>
        <v-btn
          @click="onDelete"
          :loading="deleting"
          outlined
          class="ml-5"
          min-width="36"
          v-show="selected.length"
          width="120"
        >
          <img src="/img/svg/delete.svg" width="12" />
          <span class="ml-2">Delete</span>
        </v-btn>
      </div>
    </e-right-opt-wrap>

    <div class="main-wrap">
      <v-data-table
        class="hide-bdb"
        :headers="headers"
        :items="list"
        :loading="loading"
        v-model="selected"
        :show-select="list.length > 0"
        item-key="domain"
        no-data-text=""
        loading-text=""
        hide-default-footer
        :checkbox-color="$color1"
        @click:row="onRow"
      >
        <template v-slot:item.domain="{ item }">
          <v-btn
            class="e-btn-text"
            :color="item.valid ? 'success' : 'error'"
            text
            x-small
          >
            <b>{{ item.domain }}</b></v-btn
          >

          <e-tooltip right v-if="!item.valid">
            <v-icon slot="ref" size="18" color="#333" class="pa-1 d-ib ml-2"
              >mdi-alert-circle-outline</v-icon
            >
            <span>Invalid Configuration</span>
          </e-tooltip>
          <e-tooltip right v-else-if="!item.newVersion">
            <v-icon slot="ref" size="18" color="#333" class="pa-1 d-ib ml-2"
              >mdi-alert-circle-outline</v-icon
            >
            <span
              >Lost CDN protection, will be restored after<br />deleting and
              re-binding the domain name.</span
            >
          </e-tooltip>
        </template>
      </v-data-table>
      <div class="mt-8" v-if="!list.length">
        <e-empty :loading="loading">
          {{ loading ? "Loading domains..." : "No domains" }}
        </e-empty>
      </div>
    </div>

    <v-dialog v-model="showPop" max-width="600">
      <div class="pd-30">
        <h2 class="fz-20">Add Domain</h2>
        <div>
          <div class="gray mt-2 fz-14">Select a bucket to add your domain</div>
          <div class="mt-6">
            <div v-if="!bucketList">
              <v-skeleton-loader type="article" />
            </div>
            <template v-else>
              <v-text-field
                class="hide-msg bd-1"
                dense
                solo
                clearable
                label="Search"
                prepend-inner-icon="mdi-magnify"
                v-model="keyword"
              ></v-text-field>

              <div class="bg-f6 pa-2 mt-5">
                <div class="ov-a" style="max-height: 40vh">
                  <div
                    class="d-flex al-c pd-15"
                    v-for="(it, i) in resBucketList"
                    :key="i"
                  >
                    <v-icon size="14">mdi-folder-multiple</v-icon>
                    <span class="ml-2 fz-15">{{
                      (it.name || "").cutStr(10, 10)
                    }}</span>
                    <v-btn
                      small
                      color="primary"
                      class="ml-auto"
                      @click="onSelect(it)"
                      >Select</v-btn
                    >
                  </div>
                </div>
                <div class="pa-2 ta-c">
                  <v-btn text color="primary" to="/bucket/storage/?new=bucket">
                    <v-icon size="16">mdi-folder-multiple-plus</v-icon>
                    <span class="ml-1">Create New Bucket</span>
                  </v-btn>
                </div>
              </div>
            </template>
          </div>
        </div>

        <div class="ta-c mt-8">
          <v-btn outlined width="90" @click="showPop = false">Cancel</v-btn>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      s3: (s) => s.moduleS3.s3,
    }),
    resBucketList() {
      return (this.bucketList || []).filter((it) => {
        return new RegExp(this.keyword, "i").test(it.name);
      });
    },
  },
  data() {
    return {
      headers: [
        { text: "Domain", value: "domain" },
        { text: "Bucket", value: "bucketName" },
        { text: "NameServer", value: "nameServers" },
        { text: "CreateAt", value: "createAt" },
      ],
      list: [],
      selected: [],
      loading: false,
      showPop: false,
      bucketList: null,
      domain: "",
      deleting: false,
      keyword: "",
      selectBucket: null,
      breadcrumbsItems: [
        {
          text: "Bucket",
          disabled: true,
        },
      ],
    };
  },
  watch: {
    showPop(val) {
      if (val) {
        this.getBuckets();
      }
    },
    "$route.path"(val) {
      if (val == "/bucket/domains") {
        this.getList();
        this.checkNew();
      }
    },
    s3() {
      this.checkNew();
    },
  },
  created() {
    this.$store.dispatch("initS3");
  },
  mounted() {
    this.getList();
    this.checkNew();
  },
  methods: {
    getPath(item) {
      return `/bucket/domain/${item.domain}`;
    },

    checkNew() {
      const { bucket } = this.$route.query;
      if (bucket && this.s3) {
        this.selectBucket = bucket;
        setTimeout(() => {
          this.showPop = true;
        }, 100);
      }
    },
    async onDelete() {
      try {
        const suffix = this.selected.length > 1 ? "s" : "";
        let html = `The following domain${suffix} will be permanently deleted along with associated <b>aliases</b> and <b>certs</b>. 
          <br>Are you sure you want to continue?`;
        html += '<ul class="mt-5 gray">';
        for (const it of this.selected) {
          html += `<li class="mt-2">${it.domain}</li>`;
        }
        html += "</ul>";
        await this.$confirm(html, `Delete Domain${suffix}`);
        const ids = this.selected.map((it) => it.domain).join(",");
        this.deleting = true;
        await this.$http.delete("$bucektDomain/domain/bucket/" + ids);
        this.$toast(
          this.selected.length + ` domain${suffix} deleted successfully`
        );
        await this.getList();
        this.selected = [];
      } catch (error) {
        //
      }
      this.deleting = false;
    },
    getBuckets() {
      this.s3.listBuckets({}, (err, data) => {
        if (err) return this.onErr(err);
        this.bucketList = data.Buckets.map((it) => {
          return {
            name: it.Name,
            createAt: it.CreationDate.format(),
          };
        });
        if (this.selectBucket) {
          const item = this.bucketList.filter(
            (it) => it.name == this.selectBucket
          )[0];
          if (item) this.onSelect(item);
          this.selectBucket = null;
        }
      });
    },
    onSelect(it) {
      this.$router.push(`/bucket/storage/${it.name}/?tab=settings`);
    },

    async getList() {
      try {
        this.loading = true;
        this.selected = [];
        const { data } = await this.$http.get(
          "$bucektDomain/domain/bucket/list"
        );
        this.list = data.list.map((it) => {
          it.createAt = new Date(it.createdAt * 1e3).format();
          return it;
        });
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
    onRow(item) {
      this.$router.push(`/bucket/storage/${item.bucketName}/?tab=settings`);
    },
  },
};
</script>
<style lang="scss">
@media screen and (max-width: 960px) {
  .breadcrumbs {
    position: static !important;
  }
  .v-breadcrumbs {
    padding: 0 0 16px 0;
    margin-top: -12px;
  }
}
.breadcrumbs {
  position: fixed;
  top: 0;
  left: 230px;
  z-index: 10;
}
.e-btn-text {
  padding: 0 !important;
  font-weight: normal !important;
  font-size: 14px !important;
}
.e-btn-text b {
  font-weight: 500 !important;
}
.e-btn-text::before {
  background: transparent !important;
}
</style>
