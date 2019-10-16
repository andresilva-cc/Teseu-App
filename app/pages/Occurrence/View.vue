<template>
  <Page androidStatusBarBackground="#2196f3" @loaded="loaded">

    <ActionBar :title="$t('sections.viewOccurrence')" flat="true">
      <NavigationButton :text="$t('common.back')" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
      <ActionItem @tap="reportOccurrence">
        <template>
          <Label class="fas report">&#xf06a;</Label>
        </template>
      </ActionItem>
    </ActionBar>

    <ScrollView>
      <StackLayout class="layout">

        <!-- Occurrence Info -->
        <GridLayout rows="auto, auto" columns="auto, *" class="field">
          <Label row="0" column="0" colSpan="2" class="hint">{{ $t('fields.author') }}</Label>
          <Image row="1" col="0" :src="`~/resources/images/badges/${occurrence.user.level}.png`" class="username-badge" />
          <TextField row="1" column="0" colSpan="2" :text="occurrence.user.username" editable="false" class="username" />
        </GridLayout>

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

        <!-- Reactions -->
        <Label horizontalAlignment="center" class="section">{{ $t('sections.viewOccurrenceReactions') }}</Label>

        <GridLayout rows="auto" columns="*, auto, auto, auto, *" class="reactions">
          <StackLayout row="0" column="1" orientation="horizontal">
            <Label class="like fas" :class="{ reacted: myReactions[0] }" verticalAlignment="center" @tap="submitReaction(0)">&#xf164;</Label>
            <Label verticalAlignment="center">{{ reactions[0] }}</Label>
          </StackLayout>
          
          <StackLayout row="0" column="2" orientation="horizontal">
            <Label class="still-happening fas" :class="{ reacted: myReactions[1] }" verticalAlignment="center" @tap="submitReaction(1)">&#xf00c;</Label>
            <Label verticalAlignment="center">{{ reactions[1] }}</Label>
          </StackLayout>

          <StackLayout row="0" column="3" orientation="horizontal">
            <Label class="not-happening fas" :class="{ reacted: myReactions[2] }" verticalAlignment="center" @tap="submitReaction(2)">&#xf00d;</Label>
            <Label verticalAlignment="center">{{ reactions[2] }}</Label>
          </StackLayout>
        </GridLayout>

        <!-- Comments -->
        <Label horizontalAlignment="center" class="section">{{ $t('sections.viewOccurrenceComments') }}</Label>

        <GridLayout rows="*, auto" columns="*, auto" class="field new-comment">
          <TextView row="0" column="0" rowSpan="2" columnSpan="2" v-model="newComment" autocorrect="true" :hint="$t('sections.viewOccurrenceNewCommentPlaceholder')" />
          <Label row="1" column="1" class="fas" @tap="submitComment">&#xf1d8;</Label>
        </GridLayout>

        <StackLayout v-if="comments.length > 0" class="field">
          <GridLayout v-for="comment in comments" :key="comment.id" rows="auto, auto" columns="auto, auto, 30, auto, *, auto" class="comment">
            <Image row="0" col="0" :src="`~/resources/images/badges/${comment.user.level}.png`" class="comment-badge" />
            <Label row="0" col="1" class="username" verticalAligment="center">{{ comment.user.username }}</Label>
            <Label row="0" col="2" class="separator" verticalAligment="center" horizontalAlignment="center">•</Label>
            <Label row="0" col="3" class="relative-time" verticalAligment="center">{{ comment.createdAt | relativeTime }}</Label>
            <Label v-if="user.id === comment.userId && isAuthenticated" row="0" col="5" class="delete fas" verticalAligment="center" @tap="deleteComment(comment.id)">&#xf1f8;</Label>
            <Label row="1" col="0" colSpan="4" textWrap="true" class="comment">{{ comment.comment }}</Label>
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
.report {
  padding: 5 15;
  font-size: 22;
  color: #f44336;
}

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

.username-badge {
  height: 20;
  margin-left: 5;
}

.username {
  padding-left: 30;
}

Label.section {
  margin-top: 30;
  font-size: 18;
  font-weight: bold;
  color: #333333;
}

GridLayout.reactions {
  margin: 15 0;
  font-size: 24;
  color: #333333;

  StackLayout {
    margin: 0 20;

    .fas {
      margin-right: 10;
      opacity: .5;
    }

    .fas.reacted {
      opacity: 1;
    }

    .like {
      color: #2196f3;
    }
  
    .still-happening {
      color: #4caF50;
    }
  
    .not-happening {
      color: #f44336;
    }
  }

}

.new-comment {
  TextView {
    padding-right: 30;
  }

  .fas {
    padding: 10;
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

  .comment-badge {
    height: 20;
  }

  .username {
    padding-left: 5;
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

  .comment {
    margin-top: 5;
    font-size: 16;
  }
}
</style>

<script>
import moment from 'moment'
import * as Toast from 'nativescript-toast'
import LoadingIndicator from '~/utils/loading_indicator'
import ErrorFormatter from '~/utils/error_formatter'
import OccurrenceReport from '~/components/OccurrenceReport'

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
    isAuthenticated () {
      return this.$store.getters['auth/isAuthenticated']
    },

    who () {
      return this.occurrence.victim?
        this.$t('sections.viewOccurrenceVictim') : this.$t('sections.viewOccurrenceNotVictim')
    },

    when () {
      return this.$options.filters.capitalizeFirstLetter(moment(this.occurrence.when).fromNow())
    },

    reactions () {
      return this.$store.getters['occurrenceReaction/getReactions']
    },

    myReactions () {
      return this.$store.getters['occurrenceReaction/getMyReactions']
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
  
        await this.$store.dispatch('occurrenceReaction/fetch', this.occurrence.id)
        await this.$store.dispatch('occurrenceComment/fetch', this.occurrence.id)
        
        if (this.isAuthenticated)
          await this.$store.dispatch('occurrenceReaction/myReactions', this.occurrence.id)

        LoadingIndicator.hide()

      } catch (ex) {
        alert(ErrorFormatter(ex))
      }
    },

    askForAuthentication () {
      confirm({
        title: this.$t('auth.authenticationRequired'),
        message: this.$t('auth.authenticationRequiredDescription'),
        cancelButtonText: this.$t('common.no'),
        okButtonText: this.$t('common.yes')
      }).then(async result => {
        if (result) 
          this.$navigateTo(WelcomePage, { clearHistory: true })
      })
    },

    async submitReaction (reaction) {
      try {
        if (!this.isAuthenticated) {
          this.askForAuthentication()
          return
        }

        // First, check if user has an opposite reaction
        if ((reaction === 1 && this.myReactions[2]) || (reaction === 2 && this.myReactions[1])) {
          Toast.makeText(this.$t('sections.viewOccurrenceOppositeReaction')).show()
          return
        }
  
        LoadingIndicator.show()
  
        // Check if removing reaction
        if (this.myReactions[reaction]) {
          await this.$store.dispatch('occurrenceReaction/delete', {
            occurrenceId: this.occurrence.id,
            reaction
          })
          Toast.makeText(
            this.$t('sections.viewOccurrenceDisreacted', {
              reaction: this.$t(`sections.viewOccurrenceReaction${reaction}`) 
            })
          ).show()
  
        // At last, check if adding reaction
        } else if (!this.myReactions[reaction]) {
          await this.$store.dispatch('occurrenceReaction/create', {
            occurrenceId: this.occurrence.id,
            reaction
          })
          Toast.makeText(
            this.$t('sections.viewOccurrenceReacted', {
              reaction: this.$t(`sections.viewOccurrenceReaction${reaction}`) 
            })
          ).show()
        }
  
        LoadingIndicator.hide()

      } catch (ex) {
        alert(ErrorFormatter(ex))
      }
    },

    async submitComment () {
      try {
        if (!this.isAuthenticated) {
          this.askForAuthentication()
          return
        }

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
        if (!this.isAuthenticated) {
          askForAuthentication()
          return
        }

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
    },

    async reportOccurrence () {
      try {
        if (!this.isAuthenticated) {
          this.askForAuthentication()
          return
        }
  
        this.$showModal(OccurrenceReport, {
          props: {
            occurrenceId: this.occurrence.id
          }
        })

      } catch (ex) {
        alert(ErrorFormatter(ex))
      }
    }
  }
}
</script>