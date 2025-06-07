package org.ai.SpringAiDemo.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.ai.openai.OpenAiImageModel;
import org.springframework.ai.openai.api.OpenAiApi;
import org.springframework.ai.openai.api.OpenAiImageApi;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAiConfig {
    @Value("${spring.ai.openai.api-key}")
    private String openAiKey;

    @Bean
    public OpenAiApi openAiApi() {
        return new OpenAiApi(openAiKey);
    }

    @Bean
    public ChatModel chatModel(OpenAiApi openAiApi) {
        return new OpenAiChatModel(openAiApi,
                OpenAiChatOptions.builder()
                        .withModel("gpt-4o")
                        .withTemperature(0.7)
                        .build());
    }

    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }

    @Bean
    public OpenAiImageModel openAiImageModel(OpenAiApi openAiApi) {
        return new OpenAiImageModel(new OpenAiImageApi(openAiKey));
    }
}