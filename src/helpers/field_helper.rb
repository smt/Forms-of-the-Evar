module FieldHelper

	def text_field( label_text, input_id = nil )
		input_id ||= attributify label_text
		html
	end

	def attributify(name)
		name.downcase.gsub " ", "-"
	end
end
