class Assignment < ActiveRecord::Base
  belongs_to :folder
  has_many :records, -> { where deleted: false }

  def format_date(date)
    date.strftime('%m/%d')
  end

  def format_string(string,length)
    string.nil? ? ''.ljust(length) : string.ljust(length)
  end

  def time_string_to_i(time_string)
    hours,minutes = time_string.split(':')
    hours.to_i * 60 + minutes.to_i
  end


  def report




    # max_length_who = ActiveRecord::Base.
    #   connection.
    #   execute("select max(char_length(who))
    #             from records where assignment_id = #{assignment.id}
    #             and deleted = 0").each {|row| puts row[0]}

    date_length = 8
    who_length = 10
    start_length = 9
    stop_length = 9
    interruptions_length = 15
    question_length = 9
    time_on_task_length = 12

    header = 'Date    Who       Start    Stop    Interruptions  Question TimeOnTask  Comments'
    notebook_s = header
    question_time = {}
    footer = "\n\n\n\n\n"
    minutes_footer = ''
    hours_footer = ''
    empty_line = "\n"

    self.records.each do |record|

      line = if record.commit
               "================== committing to git: #{format_date(record.date)} #{record.start} ==================="
             else

               time_on_question = time_string_to_i(record.stop) -
                   time_string_to_i(record.start) -
                   (record.interruptions ? record.interruptions : 0)

               question_time[record.question] = question_time[record.question] ? question_time[record.question] + time_on_question : time_on_question

               date = format_string(format_date(record.date),date_length)
               who = format_string(record.who,who_length)
               start = format_string(record.start,start_length)
               stop = format_string(record.stop,stop_length)
               interrupts = format_string(record.interruptions ? record.interruptions.to_s : '' ,interruptions_length)
               question = format_string(record.question.to_s, question_length)
               time_on_task = format_string(time_on_question.to_s, time_on_task_length)

               "#{date}#{who}#{start}#{stop}#{interrupts}#{question}#{time_on_task}#{record.comments}"
             end

      notebook_s += empty_line + line

    end


    question_time.keys.sort.each do |key|
      minutes_footer += empty_line + "Total Time On Task Q#{key}  (minutes)                    #{question_time[key]}"
      time = question_time[key]/60.0
      time_s = '%.2f' % time
      hours_footer += empty_line + "TOTQ#{key}  (hours and tenths)                           #{time_s[0..-2]}"
    end

    footer +=  minutes_footer + hours_footer
    report = notebook_s + footer
    report

  end






end
