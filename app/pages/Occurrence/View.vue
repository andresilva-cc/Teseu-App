<template>
  <Page androidStatusBarBackground="#2196f3" @loaded="loaded">

    <ActionBar :title="$t('sections.viewOccurrence')" flat="true">
      <NavigationButton :text="$t('common.back')" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
    </ActionBar>

    <ScrollView>
      <StackLayout class="layout">

        <!-- Occurrence Info -->
        <StackLayout class="field">
          <Label class="hint">{{ $t('fields.author') }}</Label>
          <TextField :text="occurrence.user.username" editable="false" />
        </StackLayout>

        <StackLayout class="field">
          <Label class="hint">{{ $t('fields.who') }}</Label>
          <TextField :text="who" editable="false" />
        </StackLayout>

        <StackLayout class="field">
          <Label class="hint">{{ $t('fields.when') }}</Label>
          <TextField :text="when" editable="false" />
        </StackLayout>

        <StackLayout class="field">
          <Label class="hint">{{ $t('fields.category') }}</Label>
          <TextField :text="occurrence.category.name" editable="false" />
        </StackLayout>

        <StackLayout class="field">
          <Label class="hint">{{ $t('fields.description') }}</Label>
          <TextView :text="occurrence.description" editable="false" />
        </StackLayout>

        <!-- Comments -->
        <Label horizontalAlignment="center" class="comments">{{ $t('sections.viewOccurrenceComments') }}</Label>

        <GridLayout rows="*, auto" columns="*, auto" class="field new-comment">
          <TextView row="0" column="0" rowSpan="2" columnSpan="2" v-model="newComment" autocorrect="true" :hint="$t('sections.viewOccurrenceNewCommentPlaceholder')" />
          <Label row="1" column="1" class="fas" @tap="submitComment">&#xf1d8;</Label>
        </GridLayout>

        <StackLayout v-if="comments.length > 0" class="field">
          <GridLayout v-for="comment in comments" :key="comment.id" rows="auto, auto" columns="auto, 30, auto, *, auto" class="comment">
            <Label row="0" column="0" class="username" verticalAligment="center">{{ comment.user.username }}</Label>
            <Label row="0" column="1" class="separator" verticalAligment="center" horizontalAlignment="center">•</Label>
            <Label row="0" column="2" class="relative-time" verticalAligment="center">{{ comment.createdAt | relativeTime }}</Label>
            <Label v-if="user.id === comment.userId" row="0" column="4" class="delete fas" verticalAligment="center" @tap="deleteComment(comment.id)">&#xf1f8;</Label>
            <Label row="1" column="0" columnSpan="3" textWrap="true">{{ comment.comment }}</Label>
          </GridLayout>
        </StackLayout>

        <StackLayout v-else class="field">
          <Label horizontalAlignment="center">{{ $t('sections.viewOccurrenceNoComments') }}</Label>
        </StackLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<style lang="scss" scoped>
.field {
  margin-top: 10;
  font-size: 18;
  color: #111111;
  padding: 10 0;
}

.hint {
  color: #666666;
  font-size: 14;
}

Label.comments {
  margin-top: 30;
  font-size: 18;
  font-weight: bold;
  color: #333333;
}

.new-comment {
  TextView {
    padding-right: 30;
  }

  .fas {
    color: #00a6ff;
    margin-bottom: 10;
  }
}

GridLayout.comment {
  background-color: #eeeeee;
  color: #333333;
  border-radius: 25px;
  font-size: 18;
  padding: 10 15;
  margin-bottom: 15;

  .username {
    color: #00a6ff;
    font-size: 14;
  }

  .separator {
    font-size: 14;
  }

  .relative-time {
    color: #666666;
    font-size: 14;
  }

  .delete {
    color: #666666;
    font-size: 14;
  }
}
</style>

<script>
import moment from 'moment'
import LoadingIndicator from '~/utils/loading_indicator'
import ErrorFormatter from '~/utils/error_formatter'

export default {
  props: {
    occurrence: Object
  },

  data () {
    return {
      newComment: ''
    }
  },

  computed: {
    who () {
      return this.occurrence.victim?
        this.$t('sections.viewOccurrenceVictim') : this.$t('sections.viewOccurrenceNotVictim')
    },

    when () {
      return this.$options.filters.capitalizeFirstLetter(moment(this.occurrence.when).fromNow())
    },

    comments () {
      return this.$store.getters['occurrenceComment/getComments']
    },

    user () {
      return this.$store.getters['auth/getUser']
    }
  },

  methods: {
    async loaded () {
      try {
        LoadingIndicator.show()
  
        await this.$store.dispatch('occurrenceComment/fetch', this.occurrence.id)
        LoadingIndicator.hide()

      } catch (ex) {
        console.log(ex)
        alert(ErrorFormatter(ex))
      }
    },

    async submitComment () {
      try {
        LoadingIndicator.show()
  
        await this.$store.dispatch('occurrenceComment/create', {
          occurrenceId: this.occurrence.id,
          comment: this.newComment
        })

        this.newComment = ''
  
        LoadingIndicator.hide()

      } catch (ex) {
        alert(ErrorFormatter(ex))
      }
    },

    async deleteComment (commentId) {
      try {
        confirm({
          title: this.$t('sections.viewOccurrenceCommentConfirmDeleteDialogTitle'),
          message: this.$t('sections.viewOccurrenceCommentConfirmDeleteDialogMessage'),
          cancelButtonText: this.$t('common.no'),
          okButtonText: this.$t('common.yes')
        }).then(async result => {
          if (result) {
            LoadingIndicator.show()
      
            await this.$store.dispatch('occurrenceComment/delete', {
              occurrenceId: this.occurrence.id,
              commentId
            })
      
            LoadingIndicator.hide()
          }
        })

      } catch (ex) {
        alert(ErrorFormatter(ex))
      }
    }
  }
}
</script>